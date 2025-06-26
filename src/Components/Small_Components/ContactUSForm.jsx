import { useState,useRef } from 'react';
import emailjs from '@emailjs/browser';

//used emailjs for email forwadding

export const Form = () => {

   const mail = useRef(null);

  const [showMessage,setShowMessage]=useState(false)

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

  const handleSubmit=(e)=>{

    e.preventDefault()
    sendEmail(e)
    setShowMessage(true)

    setTimeout(()=>(
      setShowMessage(false)

    ),5000)


  }
  return (
    <div className="container px-4 mx-auto">
      <div className="mx-auto">
        <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">Contact Us</h2>

          { showMessage && ( <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Thank you for your message! We will get back to you soon.
            </div>)}

          <form onSubmit={handleSubmit} ref={mail}>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="name">Your Name</label>
              <input className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300" name="name" placeholder="Enter your name" type="text" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="email">Your Email</label>
              <input className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300" placeholder="Enter your email" name="email" id="email" type="email" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 mb-1" htmlFor="message">Your Message</label>
              <textarea className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300" rows={4} placeholder="Enter your message" name="message" id="message" defaultValue={""} required />
            </div>
            <button className="w-full bg-yellow-300 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
