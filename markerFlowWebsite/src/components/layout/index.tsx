import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Layout as AntLayout } from "antd";
import "./index.scss";
const Layout = () => {
  let { isAuthenticated } = useAuth();
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }
  return (
    <AntLayout className="layout"> 
      <Outlet />
    </AntLayout>
  );
};

export default Layout;
