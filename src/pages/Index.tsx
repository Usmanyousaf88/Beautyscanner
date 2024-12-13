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
        duration: 3000,
        className: "w-[200px] bottom-16 right-4 fixed text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-1 animate-in fade-in duration-200 [&>button]:hidden",
      });
    }, 1000);

    return () => clearTimeout(showTip);
  }, [toast]);

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
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
