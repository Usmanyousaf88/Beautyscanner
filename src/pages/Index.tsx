import React from "react";
import { Scan, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import QuickActions from "@/components/home/QuickActions";
import RecentActivity from "@/components/home/RecentActivity";
import Recommendations from "@/components/home/Recommendations";
import { useQuery } from "@tanstack/react-query";

// Mock function to simulate fetching recommendations
const fetchRecommendations = async () => {
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

// Mock function to fetch recent activity
const fetchRecentActivity = async () => {
  return {
    lastScan: {
      productName: "Natural Moisturizer",
      timestamp: "2024-02-20T10:30:00Z",
      safetyScore: 95,
    },
    recentSearches: [
      "Hyaluronic Acid",
      "Vitamin C",
      "Niacinamide"
    ]
  };
};

const Index = () => {
  const { toast } = useToast();

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: fetchRecentActivity,
  });

  React.useEffect(() => {
    const showTip = setTimeout(() => {
      toast({
        title: "Quick Tip",
        description: "Try scanning your favorite moisturizer to learn more about its ingredients!",
        duration: 8000,
        className: "w-[200px] bottom-16 right-4 fixed text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-1",
      });
    }, 1000);

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
      <div className="max-w-lg mx-auto px-4 pt-6 pb-24 sm:pt-8">
        <header className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2 sm:mb-3">GreenBeauty</h1>
          <p className="text-base sm:text-lg text-gray-600">Make conscious beauty choices</p>
        </header>

        <div className="relative mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <input
            type="search"
            placeholder="Search products or ingredients..."
            className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
            onFocus={handleSearchFocus}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link
            to="/scan"
            className="block p-5 sm:p-6 bg-primary rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg group"
          >
            <div className="flex items-center">
              <div className="p-2.5 sm:p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                <Scan 
                  size={28} 
                  className="text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)]" 
                />
              </div>
              <div className="ml-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] mb-1">
                  Scan Product
                </h2>
                <p className="text-sm sm:text-base text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
                  Analyze ingredients instantly
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/search"
            className="block p-5 sm:p-6 bg-primary rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg group"
          >
            <div className="flex items-center">
              <div className="p-2.5 sm:p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                <Search 
                  size={28} 
                  className="text-white drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)]" 
                />
              </div>
              <div className="ml-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] mb-1">
                  Search Ingredients
                </h2>
                <p className="text-sm sm:text-base text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
                  Learn about ingredients
                </p>
              </div>
            </div>
          </Link>
        </div>

        <QuickActions />
        
        {recentActivity && <RecentActivity data={recentActivity} />}
        
        {recommendations && <Recommendations recommendations={recommendations} />}
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;