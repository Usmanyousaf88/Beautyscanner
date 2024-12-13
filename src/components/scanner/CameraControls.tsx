import { useState } from "react";
import { Camera, Zap, Barcode, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraControlsProps {
  hasFlash: boolean;
  isFlashOn: boolean;
  onFlashToggle: () => void;
  onCameraSwitch: () => void;
  onCapture: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CameraControls = ({
  hasFlash,
  isFlashOn,
  onFlashToggle,
  onCameraSwitch,
  onCapture,
  onFileUpload
}: CameraControlsProps) => {
  const [mode, setMode] = useState<'scan' | 'photo'>('scan');

  return (
    <div className="p-4 bg-gradient-to-t from-black/50 to-transparent">
      <div className="flex items-center justify-around mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-accent/20 active:scale-95 transition-transform"
          onClick={onFlashToggle}
          disabled={!hasFlash}
        >
          <Zap className={`h-6 w-6 ${isFlashOn ? 'text-primary' : 'text-white'}`} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full border-4 border-white bg-accent hover:bg-accent-dark active:scale-95 transition-transform shadow-lg animate-pulse"
          onClick={onCapture}
        >
          {mode === 'scan' ? (
            <Barcode className="h-8 w-8 text-charcoal" />
          ) : (
            <Camera className="h-8 w-8 text-charcoal" />
          )}
        </Button>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileUpload}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-accent/20 active:scale-95 transition-transform"
            type="button"
          >
            <ImageIcon className="h-6 w-6" />
          </Button>
        </label>
      </div>

      <div className="relative flex items-center justify-center gap-2 px-6 py-3 mx-4 bg-accent/90 backdrop-blur-sm rounded-full shadow-md overflow-hidden">
        {/* Sliding background indicator */}
        <div
          className={`absolute h-full w-[calc(50%-0.5px)] top-0 bg-accent-dark/20 rounded-full transition-transform duration-300 ease-out ${
            mode === 'photo' ? 'translate-x-[calc(100%+1px)]' : 'translate-x-0'
          }`}
        />
        
        <Button
          variant="ghost"
          className="relative flex-1 text-charcoal hover:bg-transparent active:scale-95 transition-transform text-sm gap-2 font-medium z-10"
          onClick={() => setMode('scan')}
        >
          <Barcode className="h-4 w-4" />
          Scan product
        </Button>
        
        <div className="h-8 w-[1px] bg-charcoal/20 z-10" />
        
        <Button
          variant="ghost"
          className="relative flex-1 text-charcoal hover:bg-transparent active:scale-95 transition-transform text-sm gap-2 z-10"
          onClick={() => setMode('photo')}
        >
          <Camera className="h-4 w-4" />
          Take picture
        </Button>
      </div>
    </div>
  );
};

export default CameraControls;