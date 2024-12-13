import { Award, Gift, Star, Trophy } from "lucide-react";
import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Rewards = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-charcoal mb-6">Rewards</h1>
        
        {/* Points Overview */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Your Points</h2>
              <p className="text-gray-600">Level 2 Member</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">2,450</p>
              <p className="text-sm text-gray-500">points</p>
            </div>
          </div>
          <Progress value={65} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">550 points until next level</p>
        </Card>

        {/* Available Rewards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">$5 Store Credit</h3>
                    <p className="text-sm text-gray-500">Valid for 30 days</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  1000 pts
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Member Status</h3>
                    <p className="text-sm text-gray-500">1 month access</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  2500 pts
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Exclusive Product</h3>
                    <p className="text-sm text-gray-500">Limited edition item</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  5000 pts
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* How to Earn */}
        <section>
          <h2 className="text-xl font-semibold mb-4">How to Earn Points</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Scan Products</h3>
                  <p className="text-sm text-gray-500">50 points per scan</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Write Reviews</h3>
                  <p className="text-sm text-gray-500">100 points per review</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;