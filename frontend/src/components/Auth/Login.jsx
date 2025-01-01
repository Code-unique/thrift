import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/chat');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-300 to-orange-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        className="bg-white p-8 rounded-lg shadow-xl w-96"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Quickie</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mt-2">Thrift Store Login</h2>
        </div>
        <div className="mb-4 flex items-center bg-gray-100 p-3 rounded-md">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            required
          />
        </div>
        <div className="mb-4 flex items-center bg-gray-100 p-3 rounded-md">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-md"
        >
          Login
        </motion.button>
        <p className="text-center text-sm text-gray-600 mt-4">
          New here? <span className="text-yellow-600 cursor-pointer">Sign up</span>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
