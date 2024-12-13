import { Heart, ListCheck, Target } from "lucide-react";
import ChallengeCard from "./ChallengeCard";

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
  deadline: string;
  icon: React.ReactNode;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Cruelty-Free Week",
    description: "Scan 5 cruelty-free products this week",
    progress: 2,
    total: 5,
    reward: 100,
    deadline: "7 days left",
    icon: <Heart className="text-pink-500 h-6 w-6" />,
  },
  {
    id: 2,
    title: "Sunscreen Expert",
    description: "Identify 3 safe sunscreens for sensitive skin",
    progress: 1,
    total: 3,
    reward: 75,
    deadline: "5 days left",
    icon: <ListCheck className="text-yellow-500 h-6 w-6" />,
  },
  {
    id: 3,
    title: "Eco Brand Explorer",
    description: "Discover 4 new eco-friendly brands",
    progress: 0,
    total: 4,
    reward: 150,
    deadline: "10 days left",
    icon: <Target className="text-green-500 h-6 w-6" />,
  },
];

const ChallengesSection = () => {
  return (
    <div className="mb-8">
      <h2 className="font-semibold text-charcoal mb-4 text-lg">Active Challenges</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
    </div>
  );
};

export default ChallengesSection;