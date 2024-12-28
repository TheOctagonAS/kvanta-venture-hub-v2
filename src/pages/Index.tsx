import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Coins, LineChart, Shield } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Building2 className="w-10 h-10 text-primary" />,
      title: "Tokenisert Eiendom",
      description: "Invester i brøkdeler av kvalitetssikrede eiendommer i Norden"
    },
    {
      icon: <Coins className="w-10 h-10 text-primary" />,
      title: "Leieinntekter",
      description: "Motta din andel av leieinntektene månedlig"
    },
    {
      icon: <LineChart className="w-10 h-10 text-primary" />,
      title: "Porteføljeoversikt",
      description: "Følg investeringene dine i sanntid via dashbordet"
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Sikker Plattform",
      description: "Regulert av Finanstilsynet med fokus på sikkerhet"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Nå i Beta
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            Velkommen til Kvanta.ai
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Eiendomsinvestering for alle i Norden. Start din investeringsreise med så lite som 1000 kr.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg">
              Kom i gang
            </Button>
            <Button variant="outline" size="lg">
              Se eiendommer
            </Button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Støttet av ledende aktører i Norden
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vi samarbeider med etablerte eiendomsaktører og finansinstitusjoner for å sikre en trygg og transparent investeringsplattform.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;