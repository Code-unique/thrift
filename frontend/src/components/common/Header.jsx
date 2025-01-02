import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <NavLink to="/" className="text-yellow-400">
            Quickie
          </NavLink>
        </h1>
        <nav className="space-x-4">
          <NavLink to="/" className="hover:text-yellow-300">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-yellow-300">
            Products
          </NavLink>
          {user && (
            <>
              <NavLink to="/cart" className="hover:text-yellow-300">
                Cart
              </NavLink>
              <NavLink to="/wishlist" className="hover:text-yellow-300">
                Wishlist
              </NavLink>
              <NavLink to="/orders" className="hover:text-yellow-300">
                Orders
              </NavLink>
              <NavLink to="/notifications" className="hover:text-yellow-300">
                Notifications
              </NavLink>
              {user.role === 'vendor' && (
                <NavLink to="/vendor-dashboard" className="hover:text-yellow-300">
                  Vendor Dashboard
                </NavLink>
              )}
              {user.role === 'admin' && (
                <NavLink to="/admin-dashboard" className="hover:text-yellow-300">
                  Admin Dashboard
                </NavLink>
              )}
              <button onClick={logout} className="hover:text-yellow-300">
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login" className="hover:text-yellow-300">
                Login
              </NavLink>
              <NavLink to="/signup" className="hover:text-yellow-300">
                Signup
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
