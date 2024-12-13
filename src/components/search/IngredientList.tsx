import { Check, AlertCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ingredient } from "@/types/search";

interface IngredientListProps {
  ingredients: Ingredient[];
  onSelectIngredient: (ingredient: Ingredient) => void;
}

const IngredientList = ({ ingredients, onSelectIngredient }: IngredientListProps) => {
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

  return (
    <ScrollArea className="h-[calc(50vh-100px)]">
      <div className="grid gap-4">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectIngredient(ingredient)}
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
  );
};

export default IngredientList;