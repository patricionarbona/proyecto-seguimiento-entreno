import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "./context/MainContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { emailUser } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!emailUser) {
      navigate("/");
    }
  }, [emailUser, navigate]);

  return children;
};

export default ProtectedRoute;
