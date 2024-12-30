import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import UserProfile from "@/components/UserProfile";
import UserHoldings from "@/components/UserHoldings";
import Statistics from "@/components/Statistics";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const MinSide = () => {
  const { user } = useAuth();

  const { data: profile, refetch: refetchProfile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Get both profile and KYC data
      const [profileResponse, kycResponse] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(),
        supabase
          .from('kyc_data')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()
      ]);

      if (profileResponse.error) {
        throw profileResponse.error;
      }

      // Don't throw error if KYC data doesn't exist
      if (kycResponse.error && kycResponse.error.code !== 'PGRST116') {
        throw kycResponse.error;
      }

      return {
        ...profileResponse.data,
        kyc_data: kycResponse.data
      };
    },
    enabled: !!user,
  });

  const handleStartKYC = async () => {
    await refetchProfile();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8faff] flex items-center justify-center">
        <div className="text-gray-600">Laster...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Portefølje
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {!user ? (
            <div>Please log in</div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <UserProfile 
                  isKyc={profile?.is_kyc || false} 
                  onStartKYC={handleStartKYC} 
                />
              </div>
              
              {!profile?.is_kyc && (
                <Alert className="bg-yellow-100 border-yellow-200 text-yellow-700">
                  <AlertDescription>
                    KYC-verifisering kreves for å kjøpe tokens
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <UserHoldings />
                </div>
                <div className="space-y-6">
                  <Statistics />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MinSide;