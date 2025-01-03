import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold">
          <NavLink to="/" className="text-yellow-400 hover:text-yellow-300">
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
              <button
                onClick={logout}
                className="hover:text-yellow-300 focus:outline-none"
              >
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
