import { Award } from "lucide-react";
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
}

const MilestoneCard = ({
  title,
  description,
  progress,
  total,
  icon,
  points,
}: MilestoneProps) => (
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
              <TooltipContent className="bg-white">
                <p className="text-sm">Click for more details</p>
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
);

export default MilestoneCard;