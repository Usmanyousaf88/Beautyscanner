import { Search as SearchIcon } from "lucide-react";
import Navigation from "@/components/Navigation";

const popularIngredients = [
  { name: "Hyaluronic Acid", category: "Hydrator", safety: "Safe" },
  { name: "Retinol", category: "Anti-aging", safety: "Use with caution" },
  { name: "Niacinamide", category: "Brightening", safety: "Safe" },
  { name: "Salicylic Acid", category: "Exfoliant", safety: "Use as directed" },
];

const Search = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="relative mb-8">
          <input
            type="search"
            placeholder="Search ingredients..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:border-primary"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <h2 className="text-xl font-semibold text-charcoal mb-4">Popular Ingredients</h2>
        <div className="grid gap-4">
          {popularIngredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-charcoal">{ingredient.name}</h3>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600">{ingredient.category}</span>
                <span className={`${
                  ingredient.safety === "Safe" ? "text-primary" : "text-accent-dark"
                }`}>
                  {ingredient.safety}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Search;