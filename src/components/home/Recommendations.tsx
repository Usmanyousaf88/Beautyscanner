import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecommendationItem {
  id: number;
  title: string;
  brand: string;
  type: string;
  tags: string[];
}

interface RecommendationsProps {
  recommendations: RecommendationItem[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <Card className="mt-8 animate-fade-in bg-white/50 backdrop-blur-sm" style={{ animationDelay: "0.5s" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Star className="h-5 w-5 text-primary animate-pulse" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="grid gap-4">
            {recommendations?.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.brand}</p>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium text-primary-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Recommendations;