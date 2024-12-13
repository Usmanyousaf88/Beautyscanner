import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CameraControls from "@/components/scanner/CameraControls";
import ScanningFrame from "@/components/scanner/ScanningFrame";

declare global {
  interface Window {
    ImageCapture: any;
  }
}

const ScanProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasFlash, setHasFlash] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isFrontCamera]);

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? "user" : "environment"
        }
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      // Check if flash is available
      const track = newStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlash('torch' in capabilities);

    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const toggleFlash = async () => {
    if (!stream) return;
    
    const track = stream.getVideoTracks()[0];
    try {
      // Using 'any' type to bypass TypeScript constraints since 'torch' is a valid
      // constraint in modern browsers but not yet in TypeScript's types
      const constraints: any = {
        advanced: [{ torch: !isFlashOn }]
      };
      
      await track.applyConstraints(constraints);
      setIsFlashOn(!isFlashOn);
    } catch (error) {
      console.error("Error toggling flash:", error);
      toast({
        title: "Flash Error",
        description: "Unable to control flash. This device might not support flash control.",
        variant: "destructive"
      });
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const handleCapture = () => {
    toast({
      title: "Product Captured",
      description: "Analyzing ingredients...",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Image Uploaded",
        description: "Analyzing ingredients...",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 active:scale-95 transition-transform"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <span className="text-white text-lg font-medium">Scanner</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 active:scale-95 transition-transform"
          >
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>

        <ScanningFrame />

        <CameraControls
          hasFlash={hasFlash}
          isFlashOn={isFlashOn}
          onFlashToggle={toggleFlash}
          onCameraSwitch={toggleCamera}
          onCapture={handleCapture}
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default ScanProduct;
