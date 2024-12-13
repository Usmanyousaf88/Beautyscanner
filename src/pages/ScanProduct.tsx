import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CameraControls from "@/components/scanner/CameraControls";
import ScanningFrame from "@/components/scanner/ScanningFrame";

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
      // Use the ImageCapture API to control the torch
      const imageCapture = new ImageCapture(track);
      const photoCapabilities = await imageCapture.getPhotoCapabilities();
      
      if (photoCapabilities.fillLightMode?.includes('flash')) {
        const newFlashState = !isFlashOn;
        await track.applyConstraints({
          advanced: [{ fillLightMode: newFlashState ? 'flash' : 'none' }]
        });
        setIsFlashOn(newFlashState);
      }
    } catch (error) {
      console.error("Error toggling flash:", error);
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
            className="text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <span className="text-white text-lg font-medium">Scanner</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
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