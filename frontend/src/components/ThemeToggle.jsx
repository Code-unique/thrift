// components/ThemeToggle.jsx
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-md focus:outline-none bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;
