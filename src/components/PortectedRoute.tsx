//ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user); // Get the logged-in user from Redux

  if (!user) {
    // Redirect to login page if the user is not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the protected route if the user is logged in
  return children;
};

export default ProtectedRoute;