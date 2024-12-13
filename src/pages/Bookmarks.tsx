import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";

const Bookmarks = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="relative flex items-center pt-6 px-4 mb-4">
        <BackButton />
        <h1 className="text-3xl font-bold text-charcoal ml-12">Saved Items</h1>
      </div>
      <div className="max-w-lg mx-auto px-4">
        {/* Add your bookmarks content here */}
      </div>
      <Navigation />
    </div>
  );
};

export default Bookmarks;