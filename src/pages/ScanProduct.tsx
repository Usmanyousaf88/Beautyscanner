import { useState } from "react";
import { Camera, CheckCircle, XCircle, Leaf, Skull, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";

interface ScanResult {
  productName: string;
  ingredients: {
    name: string;
    toxicity: 'safe' | 'moderate' | 'toxic';
    environmental: 'good' | 'moderate' | 'bad';
  }[];
  environmentalImpact: string;
  alternatives: string[];
}

const ScanProduct = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = () => {
    setIsCameraActive(true);
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
    
    // Simulated scan result after 3 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      
      toast({
        title: "Success!",
        description: "Product scanned successfully",
        duration: 3000,
      });
      
      setTimeout(() => {
        setScanResult({
          productName: "Example Beauty Cream",
          ingredients: [
            { name: "Aloe Vera", toxicity: "safe", environmental: "good" },
            { name: "Parabens", toxicity: "toxic", environmental: "bad" },
            { name: "Vitamin E", toxicity: "safe", environmental: "good" },
          ],
          environmentalImpact: "Moderate environmental impact due to non-recyclable packaging and presence of microplastics.",
          alternatives: [
            "Natural Beauty Cream",
            "Eco-friendly Moisturizer",
            "Green Beauty Solution"
          ]
        });
        setIsScanning(false);
        setIsCameraActive(false);
      }, 500);
    }, 3000);
  };

  const getToxicityIcon = (toxicity: string) => {
    switch (toxicity) {
      case 'safe':
        return <CheckCircle className="text-primary" />;
      case 'toxic':
        return <Skull className="text-red-500" />;
      default:
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  const getEnvironmentalIcon = (impact: string) => {
    switch (impact) {
      case 'good':
        return <Leaf className="text-primary" />;
      case 'bad':
        return <XCircle className="text-red-500" />;
      default:
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-3xl font-bold text-charcoal mt-4 mb-8">Scan Product</h1>
        
        {!scanResult && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            {!isCameraActive ? (
              <>
                <p className="text-gray-600 mb-6">
                  Position the product's barcode or ingredient list within the camera frame. 
                  Hold steady for a clear scan.
                </p>
                <Button 
                  className="w-full flex items-center justify-center gap-2 py-6"
                  onClick={handleScan}
                >
                  <Camera className="w-6 h-6" />
                  <span>Start Scanning</span>
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <p className="text-primary font-medium mb-4">
                    {isScanning ? "Align the barcode within the frame..." : "Processing scan..."}
                  </p>
                  <div className="w-full max-w-sm mx-auto h-40 bg-gray-200 rounded-lg relative overflow-hidden">
                    <Camera className={`w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary ${isScanning ? 'animate-pulse' : ''}`} />
                  </div>
                </div>
                <Progress value={scanProgress} className="w-full" />
              </div>
            )}
          </div>
        )}

        {scanResult && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">{scanResult.productName}</h2>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Ingredients Analysis</h3>
                {scanResult.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{ingredient.name}</span>
                    <div className="flex gap-2">
                      {getToxicityIcon(ingredient.toxicity)}
                      {getEnvironmentalIcon(ingredient.environmental)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium text-gray-700 mb-3">Environmental Impact</h3>
              <p className="text-gray-600">{scanResult.environmentalImpact}</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium text-gray-700 mb-3">Suggested Alternatives</h3>
              <div className="space-y-2">
                {scanResult.alternatives.map((alternative, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{alternative}</span>
                    <ArrowRight className="text-primary w-4 h-4" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default ScanProduct;