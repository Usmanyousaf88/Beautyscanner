import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RewardProps {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  onRedeem: (points: number, title: string, id: number) => void;
  disabled: boolean;
  isRedeeming: boolean;
}

const RewardCard = ({
  id,
  title,
  description,
  points,
  icon,
  onRedeem,
  disabled,
  isRedeeming,
}: RewardProps) => (
  <Card className="p-4 transform transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center gap-4">
      <div className="text-primary transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-charcoal">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-primary mt-1">{points} points</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button 
                onClick={() => onRedeem(points, title, id)}
                disabled={disabled}
                variant="outline"
                className={`shrink-0 transition-all duration-300 active:scale-95 ${
                  isRedeeming ? 'bg-primary/10' : ''
                }`}
              >
                {isRedeeming ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redeeming...
                  </span>
                ) : (
                  'Redeem'
                )}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {disabled && !isRedeeming ? 'Not enough points for this reward' : 'Click to redeem this reward'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </Card>
);

export default RewardCard;