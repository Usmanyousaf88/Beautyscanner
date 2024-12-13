import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-6 left-4"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  );
};

export default BackButton;