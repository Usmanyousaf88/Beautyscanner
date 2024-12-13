import { useState } from "react";
import { Camera, Zap, SwitchCamera, ImageIcon } from "lucide-react";
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
  return (
    <div className="p-4 bg-gradient-to-t from-black/50 to-transparent">
      <div className="flex items-center justify-around mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={onFlashToggle}
          disabled={!hasFlash}
        >
          <Zap className={`h-6 w-6 ${isFlashOn ? 'text-primary' : 'text-white'}`} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-16 w-16 rounded-full border-4 border-white bg-white/10 hover:bg-white/20 animate-pulse"
          onClick={onCapture}
        >
          <Camera className="h-8 w-8 text-white" />
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
            className="text-white hover:bg-white/20"
            type="button"
          >
            <ImageIcon className="h-6 w-6" />
          </Button>
        </label>
      </div>

      <div className="flex items-center justify-center gap-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 text-sm gap-2"
        >
          <Camera className="h-4 w-4" />
          Scan food
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onCameraSwitch}
        >
          <SwitchCamera className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CameraControls;