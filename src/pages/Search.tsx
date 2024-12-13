import { Search as SearchIcon, AlertCircle, Check, X, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import CommunityForum from "@/components/social/CommunityForum";

interface Ingredient {
  name: string;
  category: string;
  safety: "Safe" | "Moderate" | "Toxic";
  description: string;
  impacts: string[];
  alternatives: string[];
  products: string[];
}

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

const categories = ["All", "Hydrator", "Preservative", "Vitamin", "Cleanser"];
const safetyLevels = ["All", "Safe", "Moderate", "Toxic"];

const Search = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSafety, setSelectedSafety] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "Safe": return "bg-[#F2FCE2] text-primary";
      case "Moderate": return "bg-[#FEF7CD] text-accent-dark";
      case "Toxic": return "bg-red-50 text-red-500";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getSafetyIcon = (safety: string) => {
    switch (safety) {
      case "Safe": return <Check className="text-primary" size={20} />;
      case "Moderate": return <AlertCircle className="text-accent-dark" size={20} />;
      case "Toxic": return <X className="text-red-500" size={20} />;
      default: return null;
    }
  };

  const filteredIngredients = popularIngredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ingredient.category === selectedCategory;
    const matchesSafety = selectedSafety === "All" || ingredient.safety === selectedSafety;
    return matchesSearch && matchesCategory && matchesSafety;
  });

  return (
    <div className="min-h-screen bg-cream pb-20">
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

        <Collapsible open={showFilters} className="mb-4">
          <CollapsibleContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Safety Level</h3>
              <div className="flex flex-wrap gap-2">
                {safetyLevels.map((safety) => (
                  <Button
                    key={safety}
                    variant={selectedSafety === safety ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSafety(safety)}
                    className="text-sm"
                  >
                    {safety}
                  </Button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {selectedIngredient ? (
          <div className="animate-fade-in">
            <button 
              onClick={() => setSelectedIngredient(null)}
              className="mb-4 text-primary hover:text-primary-dark"
            >
              ← Back to list
            </button>
            
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-charcoal">{selectedIngredient.name}</h2>
                <span className={`px-3 py-1 rounded-full flex items-center gap-2 ${getSafetyColor(selectedIngredient.safety)}`}>
                  {getSafetyIcon(selectedIngredient.safety)}
                  {selectedIngredient.safety}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedIngredient.description}</p>
              
              <div className="space-y-6">
                <section>
                  <h3 className="font-semibold text-charcoal mb-2">Health Impacts</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedIngredient.impacts.map((impact, index) => (
                      <li key={index}>{impact}</li>
                    ))}
                  </ul>
                </section>
                
                <section>
                  <h3 className="font-semibold text-charcoal mb-2">Safer Alternatives</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedIngredient.alternatives.map((alternative, index) => (
                      <li key={index}>{alternative}</li>
                    ))}
                  </ul>
                </section>
                
                <section>
                  <h3 className="font-semibold text-charcoal mb-2">Found in Products</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedIngredient.products.map((product, index) => (
                      <li key={index}>{product}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-charcoal mb-4">
              {filteredIngredients.length} Ingredients Found
            </h2>
            <ScrollArea className="h-[calc(50vh-100px)]">
              <div className="grid gap-4">
                {filteredIngredients.map((ingredient) => (
                  <div
                    key={ingredient.name}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedIngredient(ingredient)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-charcoal">{ingredient.name}</h3>
                        <span className="text-sm text-gray-600">{ingredient.category}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full flex items-center gap-2 ${getSafetyColor(ingredient.safety)}`}>
                        {getSafetyIcon(ingredient.safety)}
                        {ingredient.safety}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Add Community Forum below the ingredients list */}
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
