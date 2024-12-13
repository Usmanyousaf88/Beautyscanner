import React from "react";
import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";

const Bookmarks = () => {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-16">
        <h1 className="text-2xl font-bold text-charcoal mb-6">Saved Items</h1>
        {/* Content will be implemented later */}
        <p className="text-gray-600">Your saved items will appear here.</p>
      </div>
      <Navigation />
    </div>
  );
};

export default Bookmarks;