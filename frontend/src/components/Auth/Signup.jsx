import { useState } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is "user"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/register', { name, email, password, role });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error('Error registering user');
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
          <h2 className="text-2xl font-semibold text-gray-600 mt-2">Thrift Store Sign Up</h2>
        </div>
        <div className="mb-4 flex items-center bg-gray-100 p-3 rounded-md">
          <FaUser className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            required
          />
        </div>
        <div className="mb-4 flex items-center bg-gray-100 p-3 rounded-md">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Email Address"
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
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            required
          />
        </div>
        <div className="mb-4 flex items-center bg-gray-100 p-3 rounded-md">
          <FaUserTag className="text-gray-500 mr-3" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            required
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-md"
        >
          Sign Up
        </motion.button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            className="text-yellow-600 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default Signup;
