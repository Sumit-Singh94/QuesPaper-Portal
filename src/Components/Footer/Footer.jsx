import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Footer = () => {

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
              <a href="#contact">Contact Us</a>
              <a href="#feedback">Feedback</a>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <div className="footer_bottom_content">
            <p>&copy; 2025 Copyrights Reserved. Made with ❤️ for students</p>
            <div className="social_links">
              <a href="#" className="social_link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="social_link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.111.222.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
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

