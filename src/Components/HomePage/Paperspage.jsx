import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Dbservice from "../../Appwrite_Config/Appwrite_Databases";
import { motion } from "framer-motion";
import { Courses } from '../index';

export function Paperspage() {
  const { coursecode, semester } = useParams();

  const {
    data: papers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["papers", coursecode, semester],
    queryFn: async () => {
      const response = await Dbservice.getPapers(coursecode, semester);
      return response && response.documents ? response.documents : [];
    },
  });

  const currentCourse = Courses.find((course) => course.coursecode === coursecode);

  if (!currentCourse) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-all duration-300 ease-in-out">
            Course Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out">
            The requested course "{coursecode}" could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 flex flex-col items-center gap-6 bg-white dark:bg-gray-900 min-h-screen transition-all duration-300 ease-in-out">
      <motion.h2 
        className="text-3xl font-semibold text-gray-800 dark:text-white tracking-wide transition-all duration-300 ease-in-out"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {coursecode} <span className="text-indigo-500 dark:text-indigo-400">/</span> {semester}
      </motion.h2>

      {isLoading ? (
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-lg transition-all duration-300 ease-in-out"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Loading papers...
        </motion.p>
      ) : isError ? (
        <motion.div
          className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 px-4 py-3 rounded shadow transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>Error loading papers:</p>
          <p className="text-sm mt-1">{error?.message || "Unknown error"}</p>
        </motion.div>
      ) : !papers || papers.length === 0 ? (
        <motion.div
          className="text-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm w-full max-w-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-medium">No papers found for this semester.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 transition-all duration-300 ease-in-out">
            Searched for:{" "}
            <strong>
              {coursecode?.toUpperCase()} - sem-{semester?.replace("semester ", "")}
            </strong>
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-center mb-6 text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            🎓 Found <strong>{papers.length}</strong> paper
            {papers.length > 1 ? "s" : ""}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {papers.map((paper, index) => (
              <motion.div
                key={paper.$id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-all duration-300 ease-in-out">
                  {paper.subject_name || paper.original_filename}
                </h3>

                <ul className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-3 mb-4 transition-all duration-300 ease-in-out">
                  <li>📅 Year: {paper.year || "N/A"}</li>
                  <li>📘 Course: {paper.coursecode}</li>
                  <li>📚 Semester: {paper.semester}</li>
                  {paper.file_size && (
                    <li>📄 Size: {(paper.file_size / 1024 / 1024).toFixed(2)} MB</li>
                  )}
                </ul>

                {paper.file_url ? (
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        window.open(paper.file_url, "_blank", "noopener,noreferrer")
                      }
                      className="!bg-purple-200   dark:bg-purple-500 text-black px-4 py-2 rounded hover:bg-purple-500 dark:hover:bg-purple-600 transition-all duration-300 ease-in-out"
                    >
                      View PDF
                    </button>
                  </div>
                ) : (
                  <p className="text-red-500 dark:text-red-400 text-sm transition-all duration-300 ease-in-out">File URL not available</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
