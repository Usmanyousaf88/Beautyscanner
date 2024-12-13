import { Home, Search, User, Award } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center p-2 ${isActive('/search') ? 'text-primary' : 'text-gray-500'}`}>
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/rewards" className={`flex flex-col items-center p-2 ${isActive('/rewards') ? 'text-primary' : 'text-gray-500'}`}>
          <Award size={24} />
          <span className="text-xs mt-1">Rewards</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 ${isActive('/profile') ? 'text-primary' : 'text-gray-500'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;