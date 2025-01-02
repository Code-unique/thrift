import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  return user && allowedRoles.includes(user.role) ? children : <Navigate to="/" />;
};

export default RoleBasedRoute;
