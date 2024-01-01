import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = ({ isAdmin, isLogin }) => {
  return isLogin && isAdmin  ? <Outlet/> : <Navigate to="/auth" replace />;
};

export default AdminRoutes;