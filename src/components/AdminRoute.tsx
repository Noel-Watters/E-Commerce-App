///AdminRoute.tsx
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.admin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;