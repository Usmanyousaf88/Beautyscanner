import { User, Upload, Settings, History, Heart, Bell, BellOff, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Profile = () => {
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

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
        toast({
          title: "Photo updated",
          description: "Your profile photo has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6 sm:pt-8">
        {/* User Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 sm:mb-8">
          <div className="relative group">
            <Avatar 
              className="h-24 w-24 sm:h-20 sm:w-20 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleAvatarClick}
            >
              <AvatarImage src={avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>
                <User className="h-10 w-10 sm:h-8 sm:w-8" />
              </AvatarFallback>
              <div className={`absolute inset-0 flex items-center justify-center ${isMobile ? 'opacity-100 bg-black bg-opacity-30' : 'opacity-0 group-hover:opacity-100 bg-black bg-opacity-50'} transition-opacity duration-300 rounded-full`}>
                <Upload className="h-8 w-8 sm:h-6 sm:w-6 text-white" />
              </div>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-xl font-bold text-charcoal">Sarah Johnson</h1>
            <p className="text-base sm:text-sm text-gray-600">Eco-conscious beauty enthusiast</p>
          </div>
        </div>

        {/* My Preferences Section */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              My Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox id="parabens" />
                <label htmlFor="parabens" className="text-sm font-medium leading-none">
                  Avoid Parabens
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="vegan" />
                <label htmlFor="vegan" className="text-sm font-medium leading-none">
                  Vegan Only
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="cruelty-free" />
                <label htmlFor="cruelty-free" className="text-sm font-medium leading-none">
                  Cruelty Free
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <History className="h-5 w-5" />
              Recent Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">Natural Moisturizer</h3>
                    <p className="text-xs text-gray-500">Scanned on Dec 10</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    Moderate Toxicity
                  </span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">Eco Shampoo</h3>
                    <p className="text-xs text-gray-500">Scanned on Dec 8</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    Safe
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-sm h-10">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Notifications</span>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;