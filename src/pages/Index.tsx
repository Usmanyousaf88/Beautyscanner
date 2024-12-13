import React from "react";
import { Scan, Search, Leaf, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

// Mock function to simulate fetching recommendations
const fetchRecommendations = async () => {
  // This would be replaced with actual API call
  return [
    {
      id: 1,
      title: "Natural Moisturizer",
      brand: "EcoBeauty",
      type: "moisturizer",
      tags: ["vegan", "paraben-free"],
    },
    {
      id: 2,
      title: "Organic Cleanser",
      brand: "PureNature",
      type: "cleanser",
      tags: ["organic", "cruelty-free"],
    },
    {
      id: 3,
      title: "Vitamin C Serum",
      brand: "GreenGlow",
      type: "serum",
      tags: ["vegan", "natural"],
    },
  ];
};

const Index = () => {
  const { toast } = useToast();

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });

  // Show welcome tip when component mounts
  React.useEffect(() => {
    const showTip = setTimeout(() => {
      toast({
        title: "Quick Tip",
        description: "Try scanning your favorite moisturizer to learn more about its ingredients!",
        duration: 5000,
      });
    }, 2000);

    return () => clearTimeout(showTip);
  }, [toast]);

  const handleSearchFocus = () => {
    toast({
      title: "Search Products",
      description: "Type any product name or ingredient to get started",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-20">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-charcoal mb-3">GreenBeauty</h1>
          <p className="text-lg text-gray-600">Make conscious beauty choices</p>
        </header>

        <div className="relative mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <input
            type="search"
            placeholder="Search products or ingredients..."
            className="w-full px-4 py-3.5 pl-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
            onFocus={handleSearchFocus}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link
            to="/scan"
            className="block p-6 bg-primary rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                <Scan 
                  size={32} 
                  className="text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_4px_4px_rgba(255,255,255,0.5)]" 
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] mb-1">
                  Scan Product
                </h2>
                <p className="text-primary-light text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
                  Analyze ingredients instantly
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/search"
            className="block p-6 bg-primary rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                <Search 
                  size={32} 
                  className="text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_4px_4px_rgba(255,255,255,0.5)]" 
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] mb-1">
                  Search Ingredients
                </h2>
                <p className="text-primary-light text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
                  Learn about ingredients
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recommendations Section */}
        <Card className="mt-8 animate-fade-in bg-white/50 backdrop-blur-sm" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <div className="grid gap-4">
                {recommendations?.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-charcoal text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{item.brand}</p>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium text-primary-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="mt-12 p-6 bg-accent rounded-xl animate-fade-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-xl font-semibold text-charcoal mb-3 flex items-center">
            <Leaf className="mr-2 text-primary" size={20} />
            Daily Tip
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Look for products with natural preservatives like neem oil or grapefruit seed extract instead of parabens.
          </p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;