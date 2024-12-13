import { User, Settings, History, Heart, Bell, BellOff, Filter, Trophy, Award, Target, ListCheck, Star, Sparkles, Gift } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";

const initialMilestones = [
  {
    id: 1,
    title: "Eco Explorer",
    description: "Scan 10 products",
    progress: 3,
    total: 10,
    icon: <Star className="text-primary" />,
    points: 50,
    nextLevel: "Eco Pioneer",
    howToEarn: "Scan more eco-friendly products to progress",
  },
  {
    id: 2,
    title: "Ingredient Master",
    description: "Learn about 20 ingredients",
    progress: 15,
    total: 20,
    icon: <Sparkles className="text-primary" />,
    points: 100,
    nextLevel: "Ingredient Guru",
    howToEarn: "Search and learn about new ingredients",
  },
  {
    id: 3,
    title: "Green Guardian",
    description: "Find 5 sustainable alternatives",
    progress: 2,
    total: 5,
    icon: <Trophy className="text-primary" />,
    points: 75,
    nextLevel: "Sustainability Champion",
    howToEarn: "Find and switch to sustainable alternatives",
  },
];

const challenges = [
  {
    id: 1,
    title: "Cruelty-Free Week",
    description: "Scan 5 cruelty-free products this week",
    progress: 2,
    total: 5,
    reward: 100,
    deadline: "7 days left",
    icon: <Heart className="text-pink-500" />,
  },
  {
    id: 2,
    title: "Sunscreen Expert",
    description: "Identify 3 safe sunscreens for sensitive skin",
    progress: 1,
    total: 3,
    reward: 75,
    deadline: "5 days left",
    icon: <ListCheck className="text-yellow-500" />,
  },
  {
    id: 3,
    title: "Eco Brand Explorer",
    description: "Discover 4 new eco-friendly brands",
    progress: 0,
    total: 4,
    reward: 150,
    deadline: "10 days left",
    icon: <Target className="text-green-500" />,
  },
];

const rewards = [
  {
    id: 1,
    title: "Eco-friendly Product Discount",
    description: "15% off on selected eco-friendly products",
    points: 200,
    icon: <Gift className="text-primary" />,
  },
  {
    id: 2,
    title: "Premium Features Access",
    description: "1-month access to premium features",
    points: 300,
    icon: <Award className="text-primary" />,
  },
  {
    id: 3,
    title: "Sustainable Brand Box",
    description: "Curated box of sustainable beauty samples",
    points: 500,
    icon: <Gift className="text-primary" />,
  },
];

const Rewards = () => {
  const [totalPoints, setTotalPoints] = useState(150);
  const [milestones, setMilestones] = useState(initialMilestones);

  const handleRedeem = (rewardPoints: number, rewardTitle: string) => {
    if (totalPoints >= rewardPoints) {
      setTotalPoints((prev) => prev - rewardPoints);
      
      setMilestones((prev) => 
        prev.map(milestone => ({
          ...milestone,
          progress: Math.min(
            milestone.total,
            milestone.progress + Math.ceil(rewardPoints / 100)
          )
        }))
      );

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
        <h2 className="font-semibold text-charcoal mb-4">Your Badges</h2>
        <div className="space-y-4 mb-8">
          {milestones.map((milestone) => (
            <HoverCard key={milestone.id}>
              <HoverCardTrigger asChild>
                <Card className="p-4 cursor-pointer hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <Award className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                      <div className="mt-2">
                        <Progress value={(milestone.progress / milestone.total) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {milestone.progress}/{milestone.total} • {milestone.points} points
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">Next Level: {milestone.nextLevel}</h4>
                  <p className="text-sm text-gray-600">{milestone.howToEarn}</p>
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      Progress: {milestone.progress}/{milestone.total} completed
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        {/* Active Challenges Section */}
        <h2 className="font-semibold text-charcoal mb-4">Active Challenges</h2>
        <div className="space-y-4 mb-8">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                {challenge.icon}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-charcoal">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      +{challenge.reward} pts
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {challenge.progress}/{challenge.total} completed
                      </p>
                      <p className="text-xs text-gray-500">{challenge.deadline}</p>
                    </div>
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
                  onClick={() => handleRedeem(reward.points, reward.title)}
                  disabled={totalPoints < reward.points}
                  variant="outline"
                  className="shrink-0"
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
