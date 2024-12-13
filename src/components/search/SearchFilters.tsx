import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface SearchFiltersProps {
  showFilters: boolean;
  selectedCategory: string;
  selectedSafety: string;
  setSelectedCategory: (category: string) => void;
  setSelectedSafety: (safety: string) => void;
}

const categories = ["All", "Hydrator", "Preservative", "Vitamin", "Cleanser"];
const safetyLevels = ["All", "Safe", "Moderate", "Toxic"];

const SearchFilters = ({
  showFilters,
  selectedCategory,
  selectedSafety,
  setSelectedCategory,
  setSelectedSafety,
}: SearchFiltersProps) => {
  return (
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
  );
};

export default SearchFilters;