import React from 'react';
import { motion } from 'framer-motion';
import { HeroHighlight } from '../AceternityUI/HeroHighlight';
import { useNavigate } from 'react-router-dom';
import { HomeScreen } from "../index";

export const AboutUs = () => {
  const navigate =useNavigate();
  const features = [
    {
      icon: "📚",
      title: "Comprehensive Question Bank",
      description: "Access hundreds of previous year questions from MAKAUT University across all courses and semesters."
    },
    {
      icon: "🎯",
      title: "Smart Study Strategy",
      description: "Focus on proven questions that frequently appear in exams to maximize your preparation efficiency."
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Study on any device - desktop, tablet, or mobile with our fully responsive design."
    },
    {
      icon: "⚡",
      title: "Fast & Reliable",
      description: "Quick access to questions with our optimized database and efficient search functionality."
    },
    {
      icon: "🌙",
      title: "Dark Mode Support",
      description: "Study comfortably with our dark mode feature that reduces eye strain during late-night sessions."
    },
    {
      icon: "🔄",
      title: "Regular Updates",
      description: "Stay updated with the latest question papers and exam patterns as they become available."
    }
  ];

  const stats = [
    { number: "500+", label: "Question Papers" },
    { number: "20+", label: "Courses" },
    { number: "100+", label: "Semesters" },
    { number: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all duration-300 ease-in-out">
      {/* Hero Section */}
      <div className="pt-8 pb-12 sm:pt-12 sm:pb-16">
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
                About Our Platform
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-4 sm:mb-6 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Empowering Students with
              <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block">Smart Study Solutions</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-300 ease-in-out px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              We are dedicated to helping MAKAUT University students excel in their academic journey by providing comprehensive access to previous year question papers. Our platform is designed to make studying more efficient and effective.
            </motion.p>
          </HeroHighlight>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 sm:py-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              We provide everything you need to excel in your MAKAUT University examinations
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out group hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
                To democratize access to quality educational resources by providing MAKAUT University students with comprehensive, well-organized, and easily accessible previous year question papers. We believe that every student deserves the opportunity to study smart and achieve their academic goals.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                Our platform is built with students in mind, offering an intuitive interface, comprehensive coverage, and reliable access to help you prepare effectively for your examinations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Ready to Start Your Smart Study Journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of students who are already using our platform to excel in their MAKAUT University examinations.
            </p>
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate("/")}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 