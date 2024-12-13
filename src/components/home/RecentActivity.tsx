import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  data: {
    lastScan?: {
      productName: string;
      timestamp: string;
      safetyScore: number;
    };
    recentSearches?: string[];
  };
}

const RecentActivity = ({ data }: RecentActivityProps) => {
  return (
    <Card className="mt-8 animate-fade-in bg-white/50 backdrop-blur-sm" style={{ animationDelay: "0.4s" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.lastScan && (
            <Link to="/scan" className="block">
              <div className="p-4 bg-white rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-charcoal">Last Scan</h3>
                    <p className="text-sm text-gray-600">{data.lastScan.productName}</p>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Score: {data.lastScan.safetyScore}
                  </span>
                </div>
              </div>
            </Link>
          )}
          {data.recentSearches && data.recentSearches.length > 0 && (
            <div className="p-4 bg-white rounded-lg border border-primary/10">
              <h3 className="font-medium text-charcoal mb-2">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {data.recentSearches.map((search, index) => (
                  <Link
                    key={index}
                    to={`/search?q=${encodeURIComponent(search)}`}
                    className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium text-primary-dark hover:bg-accent transition-colors"
                  >
                    {search}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;