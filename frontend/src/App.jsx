import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { SocketProvider } from './context/SocketContext';

import Layout from './components/common/Layout';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Chat from './components/Chat/Chat';
import ProductList from './components/Products/ProductList';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import OrderHistory from './components/Orders/OrderHistory';
import Notifications from './components/Notifications/Notifications';
import VendorDashboard from './components/Vendor/VendorDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

import ProtectedRoute from './routes/ProtectedRoute';
import RoleBasedRoute from './routes/RoleBasedRoute';

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <SocketProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:productId"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              {/* Role-Based Routes */}
              <Route
                path="/vendor-dashboard"
                element={
                  <RoleBasedRoute allowedRoles={['vendor']}>
                    <VendorDashboard />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <RoleBasedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleBasedRoute>
                }
              />
            </Routes>
            <ToastContainer />
          </Layout>
        </SocketProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
