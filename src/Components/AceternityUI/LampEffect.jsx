import React from "react";
import { motion } from "framer-motion";

export const LampEffect = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 w-full transition-all duration-300 ease-in-out">
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-auto z-[-1] flex h-full w-full justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-cyan-500/20 blur-3xl transition-all duration-300 ease-in-out" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-auto z-[-1] flex h-full w-full justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 blur-2xl transition-all duration-300 ease-in-out" />
        </motion.div>
      </div>
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}; 