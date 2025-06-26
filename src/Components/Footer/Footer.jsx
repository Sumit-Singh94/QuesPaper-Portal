import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Form } from '../Small_Components/ContactUSForm';

export const Footer = () => {

  const [showFeedback,setShowFeedback]=useState(false)

  const {coursecode} =useParams();
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <footer className="footer">
        <div className="footer_content">
          <div className="footer_section">
            <div className="footer_logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="logo_icon">
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
              </svg>
              <span className="brand_name">Makaut Previous Year Questions</span>
            </div>
            <p className="footer_tagline">Empowering students with accessible academic resources</p>
            <p><strong> * Disclaimer, this is not an official Makaut Website </strong></p>

          </div>
          <div className="footer_links">
            <div className="link_group">
              <h4>Quick Links</h4>
              {/* < >Courses</a> */}
             <Link to="/"> Courses </Link>
              <a href="#papers">Question Papers</a>
              <a href="#resources">Resources</a>
            </div>
            
            <div className="link_group">
              <h4>Support</h4>
              <a href="#help">Help Center</a>
                <button
            className="footer-feedback-btn"
            style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer', padding: 0, fontSize: '0.9rem', textAlign: 'left'}}
            onClick={() => setShowFeedback(true)}
          >
            Contact US
          </button>

              <button
            className="footer-feedback-btn"
            style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer', padding: 0, fontSize: '0.9rem', textAlign: 'left'}}
            onClick={() => setShowFeedback(true)}
          >
            Feedback
          </button>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <div className="footer_bottom_content">
            <p>&copy; 2025 All Copyrights Reserved. Made with ❤️ for students</p>

          </div>
        </div>

              
    {showFeedback && (
          <div className="fixed inset-0 w-screen h-screen bg-transparent flex items-center justify-center z-[1000] modal-container">
            <div className="relative bg-white rounded-xl shadow-2xl p-0 modal-content">
              <button
                onClick={() => setShowFeedback(false)}
                className="absolute top-2 right-2 bg-transparent border-none text-2xl text-gray-500 cursor-pointer hover:text-gray-700 z-10"
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
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
    color: #212121;
  }

  .footer_tagline {
    color: #6c757d;
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
    color: #212121;
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
    color: #6c757d;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  .link_group a:hover {
    color: #309df0;
  }

  .footer_bottom {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.5);
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
    color: #6c757d;
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
    background: rgba(48, 157, 240, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .social_link:hover {
    background: #309df0;
    transform: translateY(-2px);
  }

  .social_link svg {
    width: 18px;
    height: 18px;
    color: #309df0;
    transition: color 0.3s ease;
  }

  .social_link:hover svg {
    color: white;
  }
 ${'' /* modal edit */}

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

