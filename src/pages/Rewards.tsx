import { Award, Gift, Star, Trophy, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const initialMilestones = [
  {
    id: 1,
    title: "Eco Explorer",
    description: "Scan 10 products",
    progress: 3,
    total: 10,
    icon: <Star className="text-primary" />,
    points: 50,
  },
  {
    id: 2,
    title: "Ingredient Master",
    description: "Learn about 20 ingredients",
    progress: 15,
    total: 20,
    icon: <Sparkles className="text-primary" />,
    points: 100,
  },
  {
    id: 3,
    title: "Green Guardian",
    description: "Find 5 sustainable alternatives",
    progress: 2,
    total: 5,
    icon: <Trophy className="text-primary" />,
    points: 75,
  },
];

const rewards = [
  {
    id: 1,
    title: "15% Off Natural Products",
    points: 200,
    description: "Get a discount on selected eco-friendly brands",
  },
  {
    id: 2,
    title: "Sustainable Beauty Box",
    points: 500,
    description: "Monthly box with sustainable beauty samples",
  },
];

const Rewards = () => {
  const [totalPoints, setTotalPoints] = useState(150);
  const [milestones, setMilestones] = useState(initialMilestones);

  const handleRedeem = (rewardPoints: number, rewardTitle: string) => {
    if (totalPoints >= rewardPoints) {
      // Subtract points from total
      setTotalPoints(prev => prev - rewardPoints);
      
      // Update milestones progress proportionally
      const pointReduction = rewardPoints / milestones.length;
      setMilestones(prev => 
        prev.map(milestone => ({
          ...milestone,
          progress: Math.max(0, milestone.progress - Math.ceil(pointReduction / milestone.points))
        }))
      );

      // Show success message
      toast.success(`Successfully redeemed: ${rewardTitle}`);
    } else {
      toast.error("Not enough points to redeem this reward");
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Points Counter */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={40} className="text-accent-dark" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Your Rewards</h1>
          <div className="mt-4 bg-white rounded-xl p-6 shadow-sm">
            <p className="text-lg text-gray-600">You have</p>
            <p className="text-4xl font-bold text-primary">{totalPoints} points</p>
            <p className="text-sm text-gray-500 mt-2">Keep going to earn more rewards!</p>
          </div>
        </div>

        {/* Milestones Section */}
        <h2 className="font-semibold text-charcoal mb-4">Current Milestones</h2>
        <div className="space-y-4 mb-8">
          {milestones.map((milestone) => (
            <Card key={milestone.id} className="p-4">
              <div className="flex items-center gap-4">
                {milestone.icon}
                <div className="flex-1">
                  <h3 className="font-semibold text-charcoal">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all duration-300" 
                        style={{ width: `${(milestone.progress / milestone.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {milestone.progress}/{milestone.total} • {milestone.points} points
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Rewards Section */}
        <h2 className="font-semibold text-charcoal mb-4">Available Rewards</h2>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className="p-4">
              <div className="flex items-center gap-4">
                <Gift className="text-primary" />
                <div className="flex-1">
                  <h3 className="font-semibold text-charcoal">{reward.title}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                  <p className="text-sm text-primary mt-1">{reward.points} points</p>
                </div>
                <Button 
                  variant="outline"
                  className="shrink-0 cursor-pointer"
                  disabled={totalPoints < reward.points}
                  onClick={() => handleRedeem(reward.points, reward.title)}
                >
                  Redeem
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;