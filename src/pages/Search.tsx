import { Search as SearchIcon, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import SearchFilters from "@/components/search/SearchFilters";
import IngredientList from "@/components/search/IngredientList";
import IngredientDetail from "@/components/search/IngredientDetail";
import CommunityForum from "@/components/social/CommunityForum";
import { useState } from "react";
import { Ingredient } from "@/types/search";

const popularIngredients: Ingredient[] = [
  {
    name: "Hyaluronic Acid",
    category: "Hydrator",
    safety: "Safe",
    description: "A naturally occurring substance that helps retain moisture",
    impacts: ["Hydration", "Plumping effect", "Reduces fine lines"],
    alternatives: ["Glycerin", "Beta glucan"],
    products: ["CeraVe Moisturizer", "The Ordinary HA Serum"]
  },
  {
    name: "Parabens",
    category: "Preservative",
    safety: "Toxic",
    description: "Synthetic preservatives with potential health concerns",
    impacts: ["Hormone disruption", "Skin irritation"],
    alternatives: ["Natural preservatives", "Phenoxyethanol"],
    products: ["Various cosmetics", "Some drugstore products"]
  },
  {
    name: "Niacinamide",
    category: "Vitamin",
    safety: "Safe",
    description: "Form of Vitamin B3 that helps with various skin concerns",
    impacts: ["Reduces inflammation", "Controls oil production"],
    alternatives: ["Vitamin C", "Azelaic Acid"],
    products: ["Paula's Choice 10% Niacinamide", "The Ordinary Niacinamide"]
  },
  {
    name: "Sulfates",
    category: "Cleanser",
    safety: "Moderate",
    description: "Cleansing agents that can be harsh on skin and hair",
    impacts: ["Can cause dryness", "May irritate sensitive skin"],
    alternatives: ["Coconut-based cleansers", "Glucosides"],
    products: ["Some shampoos", "Body washes"]
  }
];

const Search = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSafety, setSelectedSafety] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredIngredients = popularIngredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ingredient.category === selectedCategory;
    const matchesSafety = selectedSafety === "All" || ingredient.safety === selectedSafety;
    return matchesSearch && matchesCategory && matchesSafety;
  });

  return (
    <div className="min-h-screen bg-cream pb-20">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Search for ingredients..."
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="ml-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className={`h-4 w-4 ${showFilters ? 'text-primary' : ''}`} />
          </Button>
        </div>

        <SearchFilters
          showFilters={showFilters}
          selectedCategory={selectedCategory}
          selectedSafety={selectedSafety}
          setSelectedCategory={setSelectedCategory}
          setSelectedSafety={setSelectedSafety}
        />

        {selectedIngredient ? (
          <IngredientDetail
            ingredient={selectedIngredient}
            onBack={() => setSelectedIngredient(null)}
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              {filteredIngredients.length} Ingredients Found
            </h2>
            <IngredientList
              ingredients={filteredIngredients}
              onSelectIngredient={setSelectedIngredient}
            />
            <div className="mt-8">
              <CommunityForum />
            </div>
          </>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Search;