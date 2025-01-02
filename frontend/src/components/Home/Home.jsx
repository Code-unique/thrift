import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-yellow-400">Quickie</span>
        </motion.h1>
        <motion.p
          className="text-lg font-medium mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Your trusted thrift e-commerce platform for unique finds and sustainable shopping.
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={() => navigate('/login')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg"
          >
            Sign Up
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
