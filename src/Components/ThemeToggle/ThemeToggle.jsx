import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        )}
      </motion.div>
    </motion.button>
  );
}; 