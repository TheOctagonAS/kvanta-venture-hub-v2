import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { vippsService } from "@/services/vippsService";

function Hero() {
  const { user } = useAuth();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["trygt", "enkelt", "lønnsomt", "transparent", "smart", "tilgjengelig"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleVippsLogin = () => {
    window.location.href = vippsService.getVippsLoginUrl();
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 py-8 lg:py-16 items-center justify-center flex-col">
          <div>
            <Link to="/les-mer">
              <Button 
                variant="secondary" 
                size="sm" 
                className="gap-4 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-nordic-charcoal font-medium rounded-full shadow-lg hover:shadow-xl transition-all border border-nordic-charcoal/10"
              >
                Les mer om Kvanta.ai <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-3 flex-col">
            <h1 className="text-3xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular text-nordic-charcoal px-2">
              <span>Eiendomsinvestering gjort</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed tracking-tight text-nordic-charcoal/80 max-w-xl text-center px-4">
              Start eiendomsreisen med bare 1000 kr. Opprett bruker og få <span className="font-bold">daglige</span> leieinntekter og verdistigning rett i din lommebok gjennom vår sikre, tokenbaserte plattform.
            </p>
          </div>
          
          {!user && (
            <Button 
              onClick={handleVippsLogin}
              size="lg" 
              className="text-lg px-8 py-6 gap-4 bg-[#FF5B2D] hover:bg-[#FF5B2D]/90 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all mt-2"
            >
              Registrer med Vipps <ArrowUpRight className="w-5 h-5" />
            </Button>
          )}

          {user && (
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/eiendommer">
                <Button 
                  size="lg" 
                  className="gap-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Se eiendommer <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Hero };