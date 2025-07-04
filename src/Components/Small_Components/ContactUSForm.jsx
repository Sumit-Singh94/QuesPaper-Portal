import { useState,useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";

//used emailjs for email forwadding

export const Form = () => {

   const mail = useRef(null);

  const [showMessage,setShowMessage]=useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

   const sendEmail = (e) => {
    e.preventDefault();

    const serviceID="service_n9whjsu"
    const templateID="template_h4z1npa"
    const publicKey="RJNqbmTYWFV2ONVc1"

    emailjs
      .sendForm(serviceID, templateID, mail.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          // console.log('SUCCESS!');
        },
        (error) => {
          // console.log('FAILED...', error.text);
        },
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    sendEmail(e);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-auto transition-all duration-300 ease-in-out"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300 ease-in-out">
          Contact Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out">
          We'd love to hear from you. Send us a message!
        </p>
      </div>

      { showMessage && ( <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Thank you for your message! We will get back to you soon.
        </div>)}

      <form onSubmit={handleSubmit} ref={mail} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 ease-in-out">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ease-in-out"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 ease-in-out">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ease-in-out"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-300 ease-in-out">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-300 ease-in-out"
            placeholder="Your message..."
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
}
