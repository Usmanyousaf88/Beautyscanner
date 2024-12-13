import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const ScanProduct = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-charcoal mb-6">Scan Product</h1>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <p className="text-gray-600 mb-6">
            Position the product's barcode or ingredient list within the camera frame. 
            Hold steady for a clear scan.
          </p>
          
          <Button 
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => alert("Camera functionality coming soon!")}
          >
            <Camera className="w-6 h-6" />
            <span>Start Scanning</span>
          </Button>
        </div>
        
        <div className="bg-secondary/50 rounded-xl p-6">
          <h2 className="font-semibold text-charcoal mb-3">Scanning Tips</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Ensure good lighting conditions</li>
            <li>• Clean the product label</li>
            <li>• Keep the phone steady</li>
          </ul>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default ScanProduct;