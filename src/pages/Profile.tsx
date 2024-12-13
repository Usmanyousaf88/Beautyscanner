import { User, Upload, Settings, History, Heart, Bell, BellOff, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* User Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative group">
            <Avatar 
              className="h-16 w-16 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleAvatarClick}
            >
              <AvatarImage src={avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 cursor-pointer group-hover:scale-110 transition-transform">
              <Upload className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-charcoal">Sarah Johnson</h1>
            <p className="text-gray-600">Eco-conscious beauty enthusiast</p>
          </div>
        </div>

        {/* My Preferences Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              My Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="parabens" />
                <label htmlFor="parabens" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Avoid Parabens
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vegan" />
                <label htmlFor="vegan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Vegan Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cruelty-free" />
                <label htmlFor="cruelty-free" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Cruelty Free
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scan History */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Natural Moisturizer</h3>
                    <p className="text-sm text-gray-500">Scanned on Dec 10</p>
                  </div>
                  <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    Moderate Toxicity
                  </span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Eco Shampoo</h3>
                    <p className="text-sm text-gray-500">Scanned on Dec 8</p>
                  </div>
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                    Safe
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
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
