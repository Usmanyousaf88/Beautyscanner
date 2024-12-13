import { Award } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
            <h3 className="font-semibold text-charcoal text-lg">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <div className="mt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Progress 
                        value={(progress / total) * 100} 
                        className="h-3 cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2">
                    <p className="text-sm text-gray-600">Click for more details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-sm text-gray-600 mt-2 font-medium">
                {progress}/{total} • {points} points
              </p>
            </div>
          </div>
        </div>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent className="w-80 p-4">
      <div className="space-y-3">
        <h4 className="font-semibold text-lg text-primary">Next Level: {nextLevel}</h4>
        <p className="text-sm text-gray-600">{howToEarn}</p>
        <div className="mt-3 pt-2 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Current Progress</p>
            <p className="text-sm text-primary font-bold">
              {Math.round((progress / total) * 100)}%
            </p>
          </div>
          <Progress 
            value={(progress / total) * 100} 
            className="h-2 mt-2"
          />
          <p className="text-xs text-gray-500 mt-2">
            {progress}/{total} milestones completed
          </p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default MilestoneCard;