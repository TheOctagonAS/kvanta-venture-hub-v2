import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

const TEST_USER = {
  email: "julian@example.com",
  password: "password123"
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (email === TEST_USER.email && password === TEST_USER.password) {
        login(email, password);
        toast.success("Innlogging vellykket!");
        navigate("/minside");
        return;
      }

      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Feil e-post eller passord.");
          } else if (error.message.includes("rate_limit")) {
            toast.error("For mange forsøk. Vennligst vent litt før du prøver igjen.");
          } else {
            toast.error("En feil oppstod under innlogging. Prøv igjen senere.");
          }
          return;
        }

        if (data.user) {
          login(data.user.email || "", password);
          toast.success("Innlogging vellykket!");
          navigate("/minside");
        }
      } else {
        toast.error("Feil e-post eller passord.");
      }
    } catch (error) {
      toast.error("En feil oppstod under innlogging. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-nordic-charcoal">
          E-post
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="din@epost.no"
          disabled={isLoading}
          className="w-full bg-white border-nordic-softblue focus:border-nordic-blue transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-nordic-charcoal">
          Passord
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          disabled={isLoading}
          className="w-full bg-white border-nordic-softblue focus:border-nordic-blue transition-colors"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-nordic-blue hover:bg-nordic-blue/90 text-white font-medium transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? "Logger inn..." : "Logg inn"}
      </Button>
      <div className="text-center mt-6">
        <Link 
          to="/register" 
          className="text-sm text-nordic-blue hover:text-nordic-blue/90 transition-colors"
        >
          Har du ikke konto? Opprett en her
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;