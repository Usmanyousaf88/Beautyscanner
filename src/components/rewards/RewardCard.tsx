import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RewardProps {
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  onRedeem: (points: number, title: string) => void;
  disabled: boolean;
  isRedeeming: boolean;
}

const RewardCard = ({
  title,
  description,
  points,
  icon,
  onRedeem,
  disabled,
  isRedeeming,
}: RewardProps) => (
  <Card className="p-4">
    <div className="flex items-center gap-4">
      {icon}
      <div className="flex-1">
        <h3 className="font-semibold text-charcoal">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-primary mt-1">{points} points</p>
      </div>
      <Button 
        onClick={() => onRedeem(points, title)}
        disabled={disabled}
        variant="outline"
        className={`shrink-0 transition-all duration-300 ${
          isRedeeming ? 'animate-pulse bg-primary/10' : ''
        }`}
      >
        {isRedeeming ? 'Redeeming...' : 'Redeem'}
      </Button>
    </div>
  </Card>
);

export default RewardCard;