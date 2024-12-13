import { Card } from "@/components/ui/card";
import { Ingredient } from "@/types/search";

interface IngredientDetailProps {
  ingredient: Ingredient;
  onBack: () => void;
}

const IngredientDetail = ({ ingredient, onBack }: IngredientDetailProps) => {
  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case "Safe": return "bg-[#F2FCE2] text-primary";
      case "Moderate": return "bg-[#FEF7CD] text-accent-dark";
      case "Toxic": return "bg-red-50 text-red-500";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-4 text-primary hover:text-primary-dark"
      >
        ← Back to list
      </button>
      
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-charcoal">{ingredient.name}</h2>
          <span className={`px-3 py-1 rounded-full ${getSafetyColor(ingredient.safety)}`}>
            {ingredient.safety}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{ingredient.description}</p>
        
        <div className="space-y-6">
          <section>
            <h3 className="font-semibold text-charcoal mb-2">Health Impacts</h3>
            <ul className="list-disc list-inside text-gray-600">
              {ingredient.impacts.map((impact, index) => (
                <li key={index}>{impact}</li>
              ))}
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-charcoal mb-2">Safer Alternatives</h3>
            <ul className="list-disc list-inside text-gray-600">
              {ingredient.alternatives.map((alternative, index) => (
                <li key={index}>{alternative}</li>
              ))}
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-charcoal mb-2">Found in Products</h3>
            <ul className="list-disc list-inside text-gray-600">
              {ingredient.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default IngredientDetail;