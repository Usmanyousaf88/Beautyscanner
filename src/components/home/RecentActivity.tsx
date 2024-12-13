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
    <Card className="mt-6 sm:mt-8 animate-fade-in bg-white/50 backdrop-blur-sm" style={{ animationDelay: "0.4s" }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.lastScan && (
            <Link to="/scan" className="block">
              <div className="p-4 bg-white rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">Last Scan</h3>
                    <p className="text-sm text-gray-600">{data.lastScan.productName}</p>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1.5 rounded-full whitespace-nowrap">
                    Score: {data.lastScan.safetyScore}
                  </span>
                </div>
              </div>
            </Link>
          )}
          {data.recentSearches && data.recentSearches.length > 0 && (
            <div className="p-4 bg-white rounded-lg border border-primary/10">
              <h3 className="font-medium text-charcoal mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2.5">
                {data.recentSearches.map((search, index) => (
                  <Link
                    key={index}
                    to={`/search?q=${encodeURIComponent(search)}`}
                    className="px-3.5 py-1.5 bg-accent/50 rounded-full text-sm font-medium text-primary-dark hover:bg-accent transition-colors"
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