import { User, Upload, Settings, History, Heart, Bell, BellOff, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <BackButton />
      <div className="max-w-lg mx-auto px-4 pt-6 sm:pt-8">
        {/* User Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 sm:mb-8">
          <ProfileAvatar />
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
