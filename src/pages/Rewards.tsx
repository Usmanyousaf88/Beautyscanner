import { useState } from "react";
import { Gift, Award } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import confetti from 'canvas-confetti';
import PointsDisplay from "@/components/rewards/PointsDisplay";
import BadgesSection from "@/components/rewards/BadgesSection";
import ChallengesSection from "@/components/rewards/ChallengesSection";
import RewardCard from "@/components/rewards/RewardCard";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";

const rewards = [
  {
    id: 1,
    title: "Eco-friendly Product Discount",
    description: "15% off on selected eco-friendly products",
    points: 200,
    icon: <Gift className="text-primary h-6 w-6" />,
  },
  {
    id: 2,
    title: "Premium Features Access",
    description: "1-month access to premium features",
    points: 300,
    icon: <Award className="text-primary h-6 w-6" />,
  },
  {
    id: 3,
    title: "Sustainable Brand Box",
    description: "Curated box of sustainable beauty samples",
    points: 500,
    icon: <Gift className="text-primary h-6 w-6" />,
  },
];

const Rewards = () => {
  const [totalPoints, setTotalPoints] = useState(150);
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
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTotalPoints(prev => prev - rewardPoints);
        setRedeemedRewards(prev => [...prev, {
          title: rewardTitle,
          points: rewardPoints,
          date: new Date()
        }]);
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
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-8">
        <PointsDisplay points={totalPoints} />
        
        <BadgesSection />
        <ChallengesSection />

        {/* Rewards Section */}
        <div className="mb-8">
          <h2 className="font-semibold text-charcoal mb-4 text-lg">Available Rewards</h2>
          <div className="space-y-4">
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
        </div>

        {/* Redeemed Rewards Section */}
        {redeemedRewards.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-charcoal mb-4 text-lg">Redeemed Rewards</h2>
            <div className="space-y-4">
              {redeemedRewards.map((reward, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-charcoal">{reward.title}</h3>
                      <p className="text-sm text-gray-500">
                        Redeemed on {reward.date.toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-primary font-medium">-{reward.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Navigation />
    </div>
  );
};

export default Rewards;
