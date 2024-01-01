import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = ({ isLoggin }) => {
    return isLoggin ? <Outlet/> : <Navigate to="/auth" replace />;
}


export default AuthRoutes;