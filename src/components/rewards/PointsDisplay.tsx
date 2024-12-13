import { Trophy } from "lucide-react";
import ShareButton from "@/components/social/ShareButton";

interface PointsDisplayProps {
  points: number;
}

const PointsDisplay = ({ points }: PointsDisplayProps) => {
  return (
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trophy size={40} className="text-accent-dark" />
      </div>
      <h1 className="text-2xl font-bold text-charcoal">Your Rewards</h1>
      <div className="mt-4 bg-white rounded-xl p-6 shadow-sm">
        <p className="text-lg text-gray-600">You have</p>
        <p className="text-4xl font-bold text-primary animate-fade-in">
          {points} points
        </p>
        <p className="text-sm text-gray-500 mt-2 mb-6">Keep going to earn more rewards!</p>
        <div className="flex justify-center">
          <ShareButton 
            title="Check out my GreenBeauty rewards!"
            text={`I've earned ${points} points on GreenBeauty! Join me in making sustainable beauty choices.`}
          />
        </div>
      </div>
    </div>
  );
};

export default PointsDisplay;