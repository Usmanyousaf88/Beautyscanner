import { Star, Sparkles, Trophy } from "lucide-react";
import MilestoneCard from "./MilestoneCard";

interface Badge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  points: number;
  nextLevel: string;
  howToEarn: string;
}

const badges: Badge[] = [
  {
    id: 1,
    title: "Eco Explorer",
    description: "Scan 10 products",
    progress: 3,
    total: 10,
    icon: <Star className="text-primary h-6 w-6" />,
    points: 50,
    nextLevel: "Eco Pioneer",
    howToEarn: "Scan more eco-friendly products to progress",
  },
  {
    id: 2,
    title: "Ingredient Master",
    description: "Learn about 20 ingredients",
    progress: 15,
    total: 20,
    icon: <Sparkles className="text-primary h-6 w-6" />,
    points: 100,
    nextLevel: "Ingredient Guru",
    howToEarn: "Search and learn about new ingredients",
  },
  {
    id: 3,
    title: "Green Guardian",
    description: "Find 5 sustainable alternatives",
    progress: 2,
    total: 5,
    icon: <Trophy className="text-primary h-6 w-6" />,
    points: 75,
    nextLevel: "Sustainability Champion",
    howToEarn: "Find and switch to sustainable alternatives",
  },
];

const BadgesSection = () => {
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-charcoal mb-6 text-xl">Your Badges</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin hover:scrollbar-thumb-primary/40 scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {badges.map((badge) => (
          <MilestoneCard key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;