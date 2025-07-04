import { useContext } from "react";
import { Card } from "./Card";
import { courseContext } from "../Context";
import { motion } from "framer-motion";

export const Cardgrid = () => {
  const { listDocs } = useContext(courseContext);

  return (
    <div className="w-full min-h-screen transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-all duration-300 ease-in-out">
            Available Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto transition-all duration-300 ease-in-out px-4">
            Choose from our comprehensive collection of courses and start your academic journey
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {listDocs?.map((course, index) => (
            <motion.div
              key={course.coursecode}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card course={course} />
            </motion.div>
          ))}
        </motion.div>

        {(!listDocs || listDocs.length === 0) && (
          <motion.div
            className="text-center py-8 sm:py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-all duration-300 ease-in-out">
              No Courses Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base transition-all duration-300 ease-in-out">
              Please check back later for available courses.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 