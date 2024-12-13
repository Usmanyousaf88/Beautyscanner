import { Search as SearchIcon } from "lucide-react";
import BackButton from "@/components/BackButton";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated search results
    setSearchResults([
      {
        id: 1,
        name: "Natural Moisturizer",
        brand: "EcoBeauty",
        safetyScore: 95,
        tags: ["Vegan", "Paraben-free"]
      },
      {
        id: 2,
        name: "Organic Cleanser",
        brand: "PureNature",
        safetyScore: 90,
        tags: ["Organic", "Cruelty-free"]
      },
      {
        id: 3,
        name: "Vitamin C Serum",
        brand: "GreenGlow",
        safetyScore: 88,
        tags: ["Natural", "Sustainable"]
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-charcoal mb-6">Search</h1>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{result.name}</h3>
                    <p className="text-sm text-gray-600">{result.brand}</p>
                    <div className="flex gap-2 mt-2">
                      {result.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Safety Score:</span>
                    <span className={`text-sm font-bold ${
                      result.safetyScore >= 90 ? 'text-green-600' :
                      result.safetyScore >= 80 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {result.safetyScore}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Search;