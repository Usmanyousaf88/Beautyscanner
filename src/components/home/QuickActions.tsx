import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Star } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/bookmarks"
          className="p-4 bg-accent rounded-xl transition-all duration-300 hover:shadow-md flex flex-col items-center text-center"
        >
          <Bookmark className="h-8 w-8 mb-2 text-primary" />
          <span className="text-sm font-bold text-black">Saved Items</span>
          <span className="text-xs text-gray-600 mt-1">View your list</span>
        </Link>
        <Link
          to="/search?popular=true"
          className="p-4 bg-accent rounded-xl transition-all duration-300 hover:shadow-md flex flex-col items-center text-center"
        >
          <Star className="h-8 w-8 mb-2 text-primary" />
          <span className="text-sm font-bold text-black">Popular</span>
          <span className="text-xs text-gray-600 mt-1">Trending items</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;