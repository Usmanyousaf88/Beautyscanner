import { Trophy, Heart, ListCheck, Target, Star, Sparkles, Gift, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { toast } from "sonner";
import MilestoneCard from "@/components/rewards/MilestoneCard";
import ChallengeCard from "@/components/rewards/ChallengeCard";
import RewardCard from "@/components/rewards/RewardCard";
import ShareButton from "@/components/social/ShareButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import confetti from 'canvas-confetti';
import { Card } from "@/components/ui/card";  // Add this import at the top of the file

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
  const [redeemingId, setRedeemingId] = useState<number | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState<{title: string, points: number} | null>(null);
  const [redeemedRewards, setRedeemedRewards] = useState<Array<{title: string, points: number, date: Date}>>([]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleRedeem = async (rewardPoints: number, rewardTitle: string, rewardId: number) => {
    if (totalPoints >= rewardPoints) {
      setRedeemingId(rewardId);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setTotalPoints(prev => prev - rewardPoints);
        
        // Update milestone progress
        setMilestones(prev => 
          prev.map(milestone => ({
            ...milestone,
            progress: Math.min(
              milestone.total,
              milestone.progress + Math.ceil(rewardPoints / 100)
            )
          }))
        );

        // Add to redeemed rewards
        setRedeemedRewards(prev => [...prev, {
          title: rewardTitle,
          points: rewardPoints,
          date: new Date()
        }]);

        // Show success dialog
        setRedeemedReward({ title: rewardTitle, points: rewardPoints });
        setShowSuccessDialog(true);
        triggerConfetti();

        toast.success(`Successfully redeemed: ${rewardTitle}`);
      } catch (error) {
        toast.error("Failed to redeem reward. Please try again.");
      } finally {
        setRedeemingId(null);
      }
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
            <p className="text-4xl font-bold text-primary animate-fade-in">
              {totalPoints} points
            </p>
            <p className="text-sm text-gray-500 mt-2 mb-6">Keep going to earn more rewards!</p>
            <div className="flex justify-center">
              <ShareButton 
                title="Check out my GreenBeauty rewards!"
                text={`I've earned ${totalPoints} points on GreenBeauty! Join me in making sustainable beauty choices.`}
              />
            </div>
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
              onRedeem={(points, title) => handleRedeem(points, title, reward.id)}
              disabled={totalPoints < reward.points || redeemingId === reward.id}
              isRedeeming={redeemingId === reward.id}
            />
          ))}
        </div>

        {/* Redeemed Rewards Section */}
        {redeemedRewards.length > 0 && (
          <>
            <h2 className="font-semibold text-charcoal mb-4">Redeemed Rewards</h2>
            <div className="space-y-4 mb-8">
              {redeemedRewards.map((reward, index) => (
                <Card key={index} className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-charcoal">{reward.title}</h3>
                      <p className="text-sm text-gray-500">
                        Redeemed on {reward.date.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-primary font-medium">-{reward.points} points</span>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reward Redeemed Successfully! 🎉</DialogTitle>
            <DialogDescription>
              <div className="py-4">
                <p>You have successfully redeemed:</p>
                <p className="font-medium text-primary mt-2">{redeemedReward?.title}</p>
                <p className="text-sm text-gray-500 mt-1">-{redeemedReward?.points} points</p>
              </div>
              <ShareButton 
                title="I just redeemed a reward on GreenBeauty!"
                text={`I just redeemed ${redeemedReward?.title} on GreenBeauty! Join me in making sustainable beauty choices.`}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Navigation />
    </div>
  );
};

export default Rewards;
