import React from "react";
import { Scan, Search, Info, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Animate progress bar on load
    const timer = setTimeout(() => setProgress(66), 500);
    
    // Show welcome tip
    const tipTimer = setTimeout(() => {
      toast({
        title: "Dica Rápida",
        description: "Experimente escanear seu hidratante favorito para conhecer seus ingredientes!",
        duration: 5000,
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tipTimer);
    };
  }, [toast]);

  const handleScanClick = () => {
    // Add pulse animation on click
    const btn = document.querySelector('.scan-button');
    btn?.classList.add('animate-pulse');
    setTimeout(() => btn?.classList.remove('animate-pulse'), 1000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-20">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-charcoal mb-2">GreenBeauty</h1>
          <p className="text-gray-600">Faça escolhas conscientes de beleza</p>
        </header>

        {/* Progress Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-charcoal">Seu Progresso</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Award className="text-primary h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>66% do caminho para seu próximo nível!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-gray-600">20 produtos escaneados</p>
        </div>

        {/* Main Actions */}
        <div className="space-y-4 animate-fade-in">
          <Link
            to="/scan"
            className="scan-button block"
            onClick={handleScanClick}
          >
            <Button
              className="w-full p-6 bg-primary hover:bg-primary-dark text-white rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <div className="flex items-center">
                <Scan size={32} />
                <div className="ml-4 text-left">
                  <h2 className="text-xl font-semibold">Escanear Produto</h2>
                  <p className="text-primary-light text-sm">Análise instantânea de ingredientes</p>
                </div>
              </div>
            </Button>
          </Link>

          <Link to="/search">
            <Button
              variant="secondary"
              className="w-full p-6 bg-secondary hover:bg-secondary-dark rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              <div className="flex items-center">
                <Search size={32} className="text-charcoal" />
                <div className="ml-4 text-left">
                  <h2 className="text-xl font-semibold text-charcoal">Buscar Ingredientes</h2>
                  <p className="text-gray-600 text-sm">Aprenda sobre ingredientes</p>
                </div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Daily Tip */}
        <div className="mt-8 p-6 bg-accent rounded-xl animate-fade-in hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <Info className="text-accent-dark h-5 w-5" />
            <h3 className="text-lg font-semibold text-charcoal">Dica do Dia</h3>
          </div>
          <p className="text-gray-600">
            Procure por produtos com conservantes naturais como óleo de neem ou extrato de semente de toranja ao invés de parabenos.
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;