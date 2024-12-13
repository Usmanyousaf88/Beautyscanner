import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ChallengeProps {
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
  deadline: string;
  icon: React.ReactNode;
  highContrast?: boolean;
  largeText?: boolean;
}

const ChallengeCard = ({
  title,
  description,
  progress,
  total,
  reward,
  deadline,
  icon,
  highContrast = false,
  largeText = false,
}: ChallengeProps) => {
  const cardClasses = `p-4 hover:shadow-md transition-all duration-300 ${
    highContrast ? 'bg-gray-900 text-white border-white' : 'bg-white'
  }`;

  const textClasses = largeText ? 'text-base' : 'text-sm';

  return (
    <Card className={cardClasses}>
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-semibold ${highContrast ? 'text-white' : 'text-charcoal'}`}>
                {title}
              </h3>
              <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                {description}
              </p>
            </div>
            <span className={`text-xs font-medium ${
              highContrast ? 'bg-white text-black' : 'text-primary bg-primary/10'
            } px-2 py-1 rounded-full`}>
              +{reward} pts
            </span>
          </div>
          <div className="mt-2">
            <Progress 
              value={(progress / total) * 100} 
              className={`h-2 ${highContrast ? 'bg-gray-700' : ''}`}
            />
            <div className="flex justify-between mt-1">
              <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
                {progress}/{total} completed
              </p>
              <p className={`${textClasses} ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
                {deadline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChallengeCard;