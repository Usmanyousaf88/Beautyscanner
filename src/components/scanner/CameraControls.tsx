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

      <div className="flex items-center justify-center gap-2 px-6 py-3 mx-4 bg-accent/90 backdrop-blur-sm rounded-full shadow-md">
        <Button
          variant="ghost"
          className={`text-charcoal hover:bg-accent-dark/30 active:scale-95 transition-transform text-sm gap-2 font-medium ${mode === 'scan' ? 'bg-accent-dark/20' : ''}`}
          onClick={() => setMode('scan')}
        >
          <Barcode className="h-4 w-4" />
          Scan product
        </Button>
        
        <div className="h-4 w-[1px] bg-charcoal/20" />
        
        <Button
          variant="ghost"
          className={`text-charcoal hover:bg-accent-dark/30 active:scale-95 transition-transform text-sm gap-2 ${mode === 'photo' ? 'bg-accent-dark/20' : ''}`}
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