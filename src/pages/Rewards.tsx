import { Trophy, Heart, ListCheck, Target, Star, Sparkles, Gift, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { toast } from "sonner";
import MilestoneCard from "@/components/rewards/MilestoneCard";
import ChallengeCard from "@/components/rewards/ChallengeCard";
import RewardCard from "@/components/rewards/RewardCard";
import CommunityForum from "@/components/social/CommunityForum";
import ShareButton from "@/components/social/ShareButton";

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
            <ShareButton 
              title="Check out my GreenBeauty rewards!"
              text={`I've earned ${totalPoints} points on GreenBeauty! Join me in making sustainable beauty choices.`}
            />
          </div>
        </div>

        {/* Milestones Section */}
        <h2 className="font-semibold text-charcoal mb-4">Your Badges</h2>
        <div className="space-y-4 mb-8">
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} {...milestone} />
          ))}
        </div>

        {/* Active Challenges Section */}
        <h2 className="font-semibold text-charcoal mb-4">Active Challenges</h2>
        <div className="space-y-4 mb-8">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>

        {/* Rewards Section */}
        <h2 className="font-semibold text-charcoal mb-4">Available Rewards</h2>
        <div className="space-y-4 mb-8">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              {...reward}
              onRedeem={handleRedeem}
              disabled={totalPoints < reward.points}
            />
          ))}
        </div>

        {/* Community Forum Section */}
        <CommunityForum />
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;
