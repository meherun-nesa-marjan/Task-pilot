import { useContext } from "react";
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div  className="text-center my-40">
        
        <span className="text-2xl">Loading...............</span>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate state={{ from: location }} to="/" replace></Navigate>
    </div>
  );
};

export default PrivateRoutes;