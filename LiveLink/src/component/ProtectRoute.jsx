import { Navigate ,Outlet  } from 'react-router-dom';
import { isAuthenticated } from '../util/Auth';


const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
