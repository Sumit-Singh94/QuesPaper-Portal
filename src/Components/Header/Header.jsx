import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroHighlight } from "../AceternityUI/HeroHighlight";

export const Header = () => {
 const { coursecode } = useParams()

 return (
  <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-[20vh] flex items-center transition-all duration-300 ease-in-out">
   <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <HeroHighlight className="text-center max-w-4xl mx-auto">
     <motion.div 
      className="mb-6 sm:mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
     >
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
       Previous Year Questions Portal
      </span>
     </motion.div>
     <motion.h1 
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-4 sm:mb-6 transition-all duration-300 ease-in-out"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
     >
      Smart Study with
      <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block">Proven Questions</span>
     </motion.h1>
     <motion.p 
      className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed transition-all duration-300 ease-in-out px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
     >
      Access curated previous year questions from Makaut University. Study
      smart, not hard.
     </motion.p>
     
     <motion.div 
      className="flex justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
     >
      {coursecode ? (
       <p className="text-gray-600 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-3 max-w-xl mx-auto leading-relaxed transition-all duration-300 ease-in-out text-center">
        {" "}
        The Course Selected Is :{coursecode}
       </p>
      ) : (
       <></>
      )}
     </motion.div>
    </HeroHighlight>
   </div>
  </div>
 );
};
