import Navigation from "@/components/Navigation";

const tips = [
  {
    id: 1,
    title: "Natural Preservatives",
    content: "Look for products with natural preservatives like neem oil or grapefruit seed extract instead of parabens.",
    category: "Ingredients",
  },
  {
    id: 2,
    title: "Sustainable Packaging",
    content: "Choose products with recyclable glass containers over plastic packaging when possible.",
    category: "Sustainability",
  },
  {
    id: 3,
    title: "Patch Testing",
    content: "Always patch test new products on a small area of skin for 24 hours before full application.",
    category: "Safety",
  },
];

const Tips = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-charcoal mb-6">Daily Tips</h1>
        
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-sm text-primary font-medium">{tip.category}</span>
              <h2 className="text-lg font-semibold text-charcoal mt-1 mb-2">{tip.title}</h2>
              <p className="text-gray-600">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Tips;