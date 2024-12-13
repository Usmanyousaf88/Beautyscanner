import { Trophy, Heart, ListCheck, Target, Star, Sparkles, Gift, Award, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { toast } from "sonner";
import MilestoneCard from "@/components/rewards/MilestoneCard";
import ChallengeCard from "@/components/rewards/ChallengeCard";
import RewardCard from "@/components/rewards/RewardCard";
import ShareButton from "@/components/social/ShareButton";
import { Switch } from "@/components/ui/switch";

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
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

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

  // Apply accessibility classes based on user preferences
  const containerClasses = `min-h-screen pb-20 ${
    highContrast 
      ? 'bg-black text-white' 
      : 'bg-cream'
  } ${
    largeText 
      ? 'text-lg' 
      : 'text-base'
  }`;

  const cardClasses = highContrast ? 'bg-gray-900 text-white border-white' : 'bg-white';

  return (
    <div className={containerClasses}>
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Accessibility Controls */}
        <div className="mb-6 p-4 rounded-lg bg-white shadow-sm" role="region" aria-label="Accessibility Controls">
          <h2 className="text-lg font-semibold mb-4">Accessibility Options</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                High Contrast Mode
              </label>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="large-text" className="flex items-center gap-2">
                <span className="text-xl">A</span>
                Larger Text
              </label>
              <Switch
                id="large-text"
                checked={largeText}
                onCheckedChange={setLargeText}
                aria-label="Toggle larger text"
              />
            </div>
          </div>
        </div>

        {/* Points Counter */}
        <div className="text-center mb-8" role="region" aria-label="Points Summary">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
            highContrast ? 'bg-white text-black' : 'bg-accent/20'
          }`}>
            <Trophy size={40} className={highContrast ? 'text-black' : 'text-accent-dark'} aria-hidden="true" />
          </div>
          <h1 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-charcoal'}`}>Your Rewards</h1>
          <div className={`mt-4 rounded-xl p-6 shadow-sm ${cardClasses}`}>
            <p className={`text-lg ${highContrast ? 'text-white' : 'text-gray-600'}`}>You have</p>
            <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-primary'}`} aria-label={`${totalPoints} points`}>
              {totalPoints} points
            </p>
            <p className={`text-sm mt-2 ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
              Keep going to earn more rewards!
            </p>
            <ShareButton 
              title="Check out my GreenBeauty rewards!"
              text={`I've earned ${totalPoints} points on GreenBeauty! Join me in making sustainable beauty choices.`}
            />
          </div>
        </div>

        {/* Milestones Section */}
        <section role="region" aria-label="Your Badges">
          <h2 className={`font-semibold mb-4 ${highContrast ? 'text-white' : 'text-charcoal'}`}>Your Badges</h2>
          <div className="space-y-4 mb-8">
            {milestones.map((milestone) => (
              <MilestoneCard 
                key={milestone.id} 
                {...milestone} 
                highContrast={highContrast}
                largeText={largeText}
              />
            ))}
          </div>
        </section>

        {/* Active Challenges Section */}
        <section role="region" aria-label="Active Challenges">
          <h2 className={`font-semibold mb-4 ${highContrast ? 'text-white' : 'text-charcoal'}`}>Active Challenges</h2>
          <div className="space-y-4 mb-8">
            {challenges.map((challenge) => (
              <ChallengeCard 
                key={challenge.id} 
                {...challenge} 
                highContrast={highContrast}
                largeText={largeText}
              />
            ))}
          </div>
        </section>

        {/* Rewards Section */}
        <section role="region" aria-label="Available Rewards">
          <h2 className={`font-semibold mb-4 ${highContrast ? 'text-white' : 'text-charcoal'}`}>Available Rewards</h2>
          <div className="space-y-4 mb-8">
            {rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                {...reward}
                onRedeem={handleRedeem}
                disabled={totalPoints < reward.points}
                highContrast={highContrast}
                largeText={largeText}
              />
            ))}
          </div>
        </section>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;
