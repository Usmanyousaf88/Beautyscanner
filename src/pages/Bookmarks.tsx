import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";

const Bookmarks = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-charcoal mb-6">Saved Items</h1>
        {/* Add your bookmarks content here */}
      </div>
      <Navigation />
    </div>
  );
};

export default Bookmarks;