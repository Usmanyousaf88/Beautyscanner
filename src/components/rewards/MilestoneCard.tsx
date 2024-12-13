import { Award } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MilestoneProps {
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  points: number;
  nextLevel: string;
  howToEarn: string;
  highContrast?: boolean;
  largeText?: boolean;
}

const MilestoneCard = ({
  title,
  description,
  progress,
  total,
  icon,
  points,
  nextLevel,
  howToEarn,
  highContrast = false,
  largeText = false,
}: MilestoneProps) => {
  const cardClasses = `p-4 cursor-pointer hover:shadow-md transition-all duration-300 ${
    highContrast ? 'bg-gray-900 text-white border-white' : 'bg-white'
  }`;

  const textClasses = largeText ? 'text-base' : 'text-sm';

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={cardClasses}>
          <div className="flex items-center gap-4">
            <Award 
              className={`h-8 w-8 ${highContrast ? 'text-white' : 'text-primary'}`} 
              aria-hidden="true"
            />
            <div className="flex-1">
              <h3 className={`font-semibold ${highContrast ? 'text-white' : 'text-charcoal'}`}>
                {title}
              </h3>
              <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
              </p>
              <div className="mt-2">
                <Progress 
                  value={(progress / total) * 100} 
                  className={`h-2 ${highContrast ? 'bg-gray-700' : ''}`}
                  aria-label={`Progress: ${progress} out of ${total}`}
                />
                <p className={`${textClasses} mt-1 ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
                  {progress}/{total} • {points} points
                </p>
              </div>
            </div>
          </div>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className={highContrast ? 'bg-gray-900 text-white border-white' : 'bg-white'}>
        <div className="space-y-2">
          <h4 className="font-semibold">Next Level: {nextLevel}</h4>
          <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
            {howToEarn}
          </p>
          <div className="mt-2 pt-2 border-t">
            <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
              Progress: {progress}/{total} completed
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MilestoneCard;