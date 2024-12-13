import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Star, Scan, Search } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
        Quick Actions
      </h2>
      <div className="flex flex-col gap-4 mb-6">
        <Link
          to="/scan"
          className="p-6 bg-accent rounded-xl transition-all duration-300 hover:shadow-md flex items-center gap-4"
        >
          <Scan className="h-12 w-12 text-primary shrink-0" />
          <div className="text-left">
            <span className="text-lg font-bold text-black block">Scan Product</span>
            <span className="text-sm text-gray-600">Check ingredients instantly</span>
          </div>
        </Link>
        <Link
          to="/search"
          className="p-6 bg-accent rounded-xl transition-all duration-300 hover:shadow-md flex items-center gap-4"
        >
          <Search className="h-12 w-12 text-primary shrink-0" />
          <div className="text-left">
            <span className="text-lg font-bold text-black block">Search</span>
            <span className="text-sm text-gray-600">Find safe beauty products</span>
          </div>
        </Link>
      </div>
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