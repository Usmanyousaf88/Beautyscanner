import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RewardProps {
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  onRedeem: (points: number, title: string) => void;
  disabled: boolean;
  highContrast?: boolean;
  largeText?: boolean;
}

const RewardCard = ({
  title,
  description,
  points,
  icon,
  onRedeem,
  disabled,
  highContrast = false,
  largeText = false,
}: RewardProps) => {
  const cardClasses = `p-4 ${highContrast ? 'bg-gray-900 text-white border-white' : 'bg-white'}`;
  const textClasses = largeText ? 'text-base' : 'text-sm';

  return (
    <Card className={cardClasses}>
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex-1">
          <h3 className={`font-semibold ${highContrast ? 'text-white' : 'text-charcoal'}`}>
            {title}
          </h3>
          <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
          <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-primary'} mt-1`}>
            {points} points
          </p>
        </div>
        <Button 
          onClick={() => onRedeem(points, title)}
          disabled={disabled}
          variant={highContrast ? "secondary" : "outline"}
          className={`shrink-0 ${highContrast ? 'bg-white text-black hover:bg-gray-200' : ''}`}
        >
          Redeem
        </Button>
      </div>
    </Card>
  );
};

export default RewardCard;