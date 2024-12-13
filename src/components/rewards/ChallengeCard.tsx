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
}

const ChallengeCard = ({
  title,
  description,
  progress,
  total,
  reward,
  deadline,
  icon,
}: ChallengeProps) => (
  <Card className="p-4 hover:shadow-md transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-charcoal truncate">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          <span className="flex-shrink-0 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
            +{reward} pts
          </span>
        </div>
        <div className="mt-2">
          <Progress value={(progress / total) * 100} className="h-2" />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">
              {progress}/{total} completed
            </p>
            <p className="text-xs text-gray-500">{deadline}</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default ChallengeCard;