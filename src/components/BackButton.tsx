import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // List of main routes where we don't want to show the back button
  const mainRoutes = ['/', '/search', '/rewards', '/profile'];
  
  // Don't render the button if we're on a main route
  if (mainRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <ArrowLeft
      className="absolute top-6 left-4 h-6 w-6 text-primary cursor-pointer"
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;