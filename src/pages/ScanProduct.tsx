import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MoreVertical, 
  Zap, 
  Image as ImageIcon, 
  FlipCamera2,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    const capabilities = track.getCapabilities();
    
    if ('torch' in capabilities) {
      const newFlashState = !isFlashOn;
      await track.applyConstraints({
        advanced: [{ torch: newFlashState }]
      });
      setIsFlashOn(newFlashState);
    }
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const handleCapture = () => {
    // Add capture logic here
    toast({
      title: "Product Captured",
      description: "Analyzing ingredients...",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      toast({
        title: "Image Uploaded",
        description: "Analyzing ingredients...",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col">
        {/* Header */}
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

        {/* Scanning Frame */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm aspect-[3/4] border-2 border-white/30 rounded-lg relative">
            <div className="absolute inset-0 border-[16px] border-white/10 rounded-lg" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex items-center justify-around mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleFlash}
              disabled={!hasFlash}
            >
              <Zap className={`h-6 w-6 ${isFlashOn ? 'text-primary' : 'text-white'}`} />
            </Button>
            
            {/* Capture Button */}
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 rounded-full border-4 border-white bg-white/10 hover:bg-white/20 animate-pulse"
              onClick={handleCapture}
            >
              <Camera className="h-8 w-8 text-white" />
            </Button>

            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
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

          {/* Action Bar */}
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
              onClick={toggleCamera}
            >
              <FlipCamera2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanProduct;