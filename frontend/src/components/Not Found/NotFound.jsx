import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200">
      <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">404</h1>
      <p className="text-lg mb-6">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-md hover:from-blue-600 hover:to-indigo-600"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
