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
}: MilestoneProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Card className="p-4 cursor-pointer hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-4">
          <Award className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-charcoal">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="mt-2">
              <Progress value={(progress / total) * 100} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {progress}/{total} • {points} points
              </p>
            </div>
          </div>
        </div>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="space-y-2">
        <h4 className="font-semibold">Next Level: {nextLevel}</h4>
        <p className="text-sm text-gray-600">{howToEarn}</p>
        <div className="mt-2 pt-2 border-t">
          <p className="text-xs text-gray-500">
            Progress: {progress}/{total} completed
          </p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default MilestoneCard;