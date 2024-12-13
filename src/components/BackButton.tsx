import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <ArrowLeft
      className="absolute top-6 left-4 h-6 w-6 text-primary cursor-pointer"
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;