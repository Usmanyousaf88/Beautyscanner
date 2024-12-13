import { Award, Star, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";

const Rewards = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={40} className="text-accent-dark" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Your Rewards</h1>
          <p className="text-gray-600">Track your eco-conscious journey</p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-charcoal">Progress</h2>
            <span className="text-primary">Level 2</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div className="bg-primary rounded-full h-2 w-3/4"></div>
          </div>
          <p className="text-sm text-gray-600">75/100 points to next level</p>
        </div>

        <h2 className="font-semibold text-charcoal mb-4">Recent Achievements</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl flex items-center gap-4">
            <Award className="text-primary" />
            <div>
              <h3 className="font-semibold text-charcoal">First Scan</h3>
              <p className="text-sm text-gray-600">Completed your first product scan</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl flex items-center gap-4">
            <Star className="text-primary" />
            <div>
              <h3 className="font-semibold text-charcoal">Eco Explorer</h3>
              <p className="text-sm text-gray-600">Scanned 5 sustainable products</p>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;