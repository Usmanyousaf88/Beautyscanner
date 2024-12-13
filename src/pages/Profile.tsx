import { User, Settings, History, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";

const Profile = () => {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Your Profile</h1>
          <p className="text-gray-600">Customize your experience</p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-white p-4 rounded-xl flex items-center gap-4 hover:bg-gray-50">
            <Settings className="text-primary" />
            <div className="text-left">
              <h2 className="font-semibold text-charcoal">Preferences</h2>
              <p className="text-sm text-gray-600">Set your ingredient preferences</p>
            </div>
          </button>

          <button className="w-full bg-white p-4 rounded-xl flex items-center gap-4 hover:bg-gray-50">
            <History className="text-primary" />
            <div className="text-left">
              <h2 className="font-semibold text-charcoal">Scan History</h2>
              <p className="text-sm text-gray-600">View your previous scans</p>
            </div>
          </button>

          <button className="w-full bg-white p-4 rounded-xl flex items-center gap-4 hover:bg-gray-50">
            <Heart className="text-primary" />
            <div className="text-left">
              <h2 className="font-semibold text-charcoal">Saved Products</h2>
              <p className="text-sm text-gray-600">Access your favorites</p>
            </div>
          </button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;