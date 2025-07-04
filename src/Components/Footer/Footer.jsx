import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Form } from '../Small_Components/ContactUSForm';
import { motion } from "framer-motion";

export const Footer = () => {

  const [showFeedback, setShowFeedback] = useState(false)

  const { coursecode } = useParams();
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <footer className="footer bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 ease-in-out">
        <motion.div 
          className="footer_content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="footer_section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="footer_logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="logo_icon">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="brand_name text-gray-900 dark:text-white transition-all duration-300 ease-in-out">QuesPaper Portal</span>
            </div>
            <p className="footer_tagline text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out">Empowering students with accessible academic resources</p>
            <p className="text-gray-600 dark:text-gray-400 transition-all duration-300 ease-in-out"><strong> * Disclaimer, this is not an official Makaut Website </strong></p>

          </motion.div>
          <motion.div 
            className="footer_links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="link_group">
              <h4 className="text-gray-900 dark:text-white transition-all duration-300 ease-in-out">Quick Links</h4>
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out">Courses</Link>
              <a href="#papers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out">Question Papers</a>
              <a href="#resources" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out">Resources</a>
            </div>
            <div className="link_group">
              <h4 className="text-gray-900 dark:text-white transition-all duration-300 ease-in-out">Support</h4>
              <a href="#help" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out">Help Center</a>
              <button
                className="footer-feedback-btn text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => setShowFeedback(true)}
              >
                Contact US
              </button>
              <button
                className="footer-feedback-btn text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => setShowFeedback(true)}
              >
                Feedback
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="footer_bottom bg-white/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="footer_bottom_content">
            <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out">&copy; 2025 All Copyrights Reserved. Made with ❤️ for students</p>
            <div className="social_links">
              <a href="#" className="social_link bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out">
                <svg viewBox="0 0 24 24" fill="none" className="text-blue-500 dark:text-blue-400">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="social_link bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out">
                <svg viewBox="0 0 24 24" fill="none" className="text-blue-500 dark:text-blue-400">
                  <path d="M23 3A10.9 10.9 0 0 0 16.5 1C13.5 1 11.5 3 10.5 5.5C9.5 8 10.5 11 13 12.5C12.5 12.5 12 12.5 11.5 12.5C9.5 12.5 7.5 11.5 6.5 10C5.5 8.5 5.5 6.5 6.5 5C7.5 3.5 9.5 2.5 11.5 2.5C13.5 2.5 15.5 3.5 16.5 5C17.5 6.5 17.5 8.5 16.5 10C15.5 11.5 13.5 12.5 11.5 12.5C10.5 12.5 9.5 12 8.5 11.5C7.5 11 6.5 10.5 5.5 10C4.5 9.5 3.5 9 2.5 8.5C1.5 8 0.5 7.5 0 7C0.5 6.5 1.5 6 2.5 5.5C3.5 5 4.5 4.5 5.5 4C6.5 3.5 7.5 3 8.5 2.5C9.5 2 10.5 1.5 11.5 1.5C12.5 1.5 13.5 2 14.5 2.5C15.5 3 16.5 3.5 17.5 4C18.5 4.5 19.5 5 20.5 5.5C21.5 6 22.5 6.5 23 7V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="social_link bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 ease-in-out">
                <svg viewBox="0 0 24 24" fill="none" className="text-blue-500 dark:text-blue-400">
                  <path d="M16 8A6 6 0 0 1 22 14V21H18V14A2 2 0 0 0 16 12A2 2 0 0 0 14 14V21H10V14A6 6 0 0 1 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {showFeedback && (
          <div className="fixed inset-0 w-screen h-screen bg-black/50 dark:bg-black/70 flex items-center justify-center z-[1000] modal-container transition-all duration-300 ease-in-out">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-0 modal-content transition-all duration-300 ease-in-out">
              <button
                onClick={() => setShowFeedback(false)}
                className="absolute top-2 right-2 bg-transparent border-none text-2xl text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-800 dark:hover:text-white z-10 transition-all duration-300 ease-in-out"
                aria-label="Close"
              >
                &times;
              </button>
              <Form />
            </div>
          </div>
        )}

      </footer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 4rem;
  }
  .feedback-form-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .footer_content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  .footer_section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer_logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .logo_icon {
    width: 32px;
    height: 32px;
    color: #309df0;
  }

  .brand_name {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .footer_tagline {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  .footer_links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .link_group h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .link_group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .link_group a {
    text-decoration: none;
    font-size: 0.9rem;
  }

  .footer_bottom_content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer_bottom p {
    font-size: 0.9rem;
    margin: 0;
  }

  .social_links {
    display: flex;
    gap: 1rem;
  }

  .social_link {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .social_link svg {
    width: 18px;
    height: 18px;
    transition: color 0.3s ease;
  }

  .social_link:hover svg {
    color: white;
  }

  .modal-container {
    padding: 1rem;
  }
  
  .modal-content {
    width: 30rem;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .modal-content {
      max-width: 95vw;
      max-height: 85vh;
    }
  }

  @media (max-width: 480px) {
    .modal-container {
      padding: 0.5rem;
    }
    
    .modal-content {
      max-width: 100vw;
      max-height: 90vh;
      border-radius: 0.5rem;
    }
  }

  @media (min-width: 1024px) {
    .modal-content {
      max-width: 700px;
    }
  }

  @media (min-width: 1280px) {
    .modal-content {
      max-width: 800px;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .footer_content {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem 1rem;
    }

    .footer_links {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .footer_bottom_content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
      padding: 1.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    .footer_content {
      padding: 2rem 1rem;
    }

    .footer_bottom_content {
      padding: 1rem;
    }

    .brand_name {
      font-size: 1.25rem;
    }

    .footer_tagline {
      font-size: 0.9rem;
    }
  }
`;

