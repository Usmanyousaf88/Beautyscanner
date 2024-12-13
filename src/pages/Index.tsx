import { Scan, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-20">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-bold text-charcoal mb-2">GreenBeauty</h1>
          <p className="text-gray-600">Make conscious beauty choices</p>
        </header>

        <div className="relative mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <input
            type="search"
            placeholder="Search products or ingredients..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:border-primary"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link
            to="/scan"
            className="block p-6 bg-primary text-white rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center">
              <Scan size={32} />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">Scan Product</h2>
                <p className="text-primary-light text-sm">Analyze ingredients instantly</p>
              </div>
            </div>
          </Link>

          <Link
            to="/ingredients"
            className="block p-6 bg-secondary rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center">
              <Search size={32} className="text-charcoal" />
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-charcoal">Search Ingredients</h2>
                <p className="text-gray-600 text-sm">Learn about ingredients</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-accent rounded-xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-lg font-semibold text-charcoal mb-2">Daily Tip</h3>
          <p className="text-gray-600">Look for products with natural preservatives like neem oil or grapefruit seed extract instead of parabens.</p>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;