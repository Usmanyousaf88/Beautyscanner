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
    <div className="flex items-center gap-4">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-charcoal">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
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