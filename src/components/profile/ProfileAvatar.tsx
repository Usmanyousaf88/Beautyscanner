import { User, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ProfileAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas dimensions to create a square
          const size = 400;
          canvas.width = size;
          canvas.height = size;
          
          if (ctx) {
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Calculate dimensions to maintain aspect ratio and center the image
            const scale = Math.max(size / img.width, size / img.height);
            const x = (size - img.width * scale) / 2;
            const y = (size - img.height * scale) / 2;
            
            // Draw the image centered and scaled
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            
            // Convert to base64 and set as avatar
            const resizedImage = canvas.toDataURL('image/jpeg', 0.9);
            setAvatarUrl(resizedImage);
            toast({
              title: "Photo updated",
              description: "Your profile photo has been updated successfully",
            });
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <Avatar 
        className="h-24 w-24 sm:h-20 sm:w-20 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleAvatarClick}
      >
        <AvatarImage 
          src={avatarUrl || "/placeholder.svg"} 
          className="object-cover"
          alt="Profile picture"
        />
        <AvatarFallback>
          <User className="h-10 w-10 sm:h-8 sm:w-8" />
        </AvatarFallback>
        {!avatarUrl && (
          <div className={`absolute inset-0 flex items-center justify-center ${isMobile ? 'opacity-100 bg-black bg-opacity-30' : 'opacity-0 group-hover:opacity-100 bg-black bg-opacity-50'} transition-opacity duration-300 rounded-full`}>
            <Upload className="h-8 w-8 sm:h-6 sm:w-6 text-white" />
          </div>
        )}
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};