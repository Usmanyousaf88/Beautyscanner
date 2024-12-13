import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";

const Tips = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-charcoal mb-6">Tips</h1>
        <p className="text-base text-gray-600 mb-4">Here are some tips to help you make conscious beauty choices:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Always check the ingredient list before purchasing a product.</li>
          <li>Look for certifications like organic, cruelty-free, and vegan.</li>
          <li>Research brands to understand their sustainability practices.</li>
          <li>Consider the environmental impact of packaging.</li>
          <li>Stay informed about harmful ingredients to avoid.</li>
        </ul>
      </div>
      <Navigation />
    </div>
  );
};

export default Tips;
