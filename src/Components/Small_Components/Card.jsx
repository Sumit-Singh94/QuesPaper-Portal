import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { courseContext } from '../Context';

const SectionHeader = ({ title, subtitle }) => (
    <div style={{ textAlign: 'center', margin: '40px 0 20px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#483d8b ' }}>{title}</h2>
        {subtitle && <p style={{ color: '#555', marginTop: '8px',fontWeight:500,fontSize:'1.2rem' }}>{subtitle}</p>}
    </div>
);

export const Card = ({course}) => {
    const navigate = useNavigate()
  
    const handleCardClick = () => {
        navigate(`/course/${course.coursecode}`);
    };

    return (
        <StyledWrapper>
            <div className="card" onClick={handleCardClick}>
                <div className="card-inner">
                    <div className="content">
                        <div className="course-code">
                            {course.coursecode}
                        </div>
                        <div className="divider"></div>
                        <div className="subtitle">
                            Explore Semesters
                        </div>
                        <div className="hover-indicator">
                            <span>→</span>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .card {
        position: relative;
        width: 300px;
        height: 180px;
        border-radius: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }

    .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%,
            rgba(0, 0, 0, 0.05) 100%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 16px;
    }

    .card:hover::before {
        opacity: 1;
    }

    .card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .content {
        text-align: center;
        color: white;
        width: 100%;
        position: relative;
    }

    .course-code {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 12px;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .divider {
        width: 40px;
        height: 2px;
        background: rgba(255, 255, 255, 0.6);
        margin: 0 auto 12px;
        border-radius: 2px;
        transition: all 0.3s ease;
    }

    .card:hover .divider {
        width: 60px;
        background: rgba(255, 255, 255, 0.9);
    }

    .subtitle {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.9;
        margin-bottom: 16px;
        transition: all 0.3s ease;
    }

    .card:hover .subtitle {
        opacity: 1;
        transform: translateY(-2px);
    }

    .hover-indicator {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .hover-indicator span {
        font-size: 18px;
        font-weight: bold;
        transition: transform 0.3s ease;
    }

    .card:hover .hover-indicator {
        bottom: 16px;
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.4);
    }

    .card:hover .hover-indicator span {
        transform: translateX(2px);
    }

    /* Alternative gradient themes */
    .card:nth-child(2n) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .card:nth-child(3n) {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .card:nth-child(4n) {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    .card:nth-child(5n) {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .card {
            width: 280px;
            height: 160px;
        }
        
        .card-inner {
            padding: 20px;
        }
        
        .course-code {
            font-size: 24px;
        }
        
        .subtitle {
            font-size: 13px;
        }
    }

    @media (max-width: 480px) {
        .card {
            width: 260px;
            height: 140px;
        }
        
        .course-code {
            font-size: 22px;
        }
        
        .hover-indicator {
            width: 35px;
            height: 35px;
        }
        
        .hover-indicator span {
            font-size: 16px;
        }
    }
`;

export const Cardgrid = () => {
    const {listDocs} = useContext(courseContext);

    if (!listDocs || listDocs.length === 0) {
        return (
            <BackgroundWrapper>
                <SectionHeader
                    title=" Please Select Your Course"
                    subtitle="Check back later for new course updates"
                />
                <EmptyStateWrapper>
                    <div className='empty-content'>
                        <div className='empty-icon'>📚</div>
                        <div className='empty-title'>No courses available</div>
                        <div className='empty-subtitle'>Check back later for updates</div>
                    </div>
                </EmptyStateWrapper>
            </BackgroundWrapper>
        );
    }

    return (
        <BackgroundWrapper>
            <SectionHeader 
                title=" Please Select Your Course"
                subtitle="Discover your learning journey through our comprehensive course catalog"
            />
            <CardsContainer>
                {listDocs.map((course) => (
                    <Card
                        key={course.$id}
                        course={course}
                    />
                ))}
            </CardsContainer>
        </BackgroundWrapper>
    );
}


const BackgroundWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    position: relative;
    
    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
    }
    
    > * {
        position: relative;
        z-index: 2;
    }
`;

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    padding: 40px 20px 80px;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 768px) {
        gap: 24px;
        padding: 30px 16px 60px;
    }
`;

const EmptyStateWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 40px 20px;

    .empty-content {
        text-align: center;
        background: rgba(255, 255, 255, 0.9);
        padding: 60px 40px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 400px;
    }

    .empty-icon {
        font-size: 4rem;
        margin-bottom: 20px;
        opacity: 0.8;
    }

    .empty-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #4a5568;
        margin-bottom: 12px;
    }

    .empty-subtitle {
        font-size: 1rem;
        color: #718096;
        opacity: 0.8;
    }

    @media (max-width: 480px) {
        .empty-content {
            padding: 40px 30px;
            margin: 0 20px;
        }
        
        .empty-icon {
            font-size: 3rem;
        }
        
        .empty-title {
            font-size: 1.3rem;
        }
        
        .empty-subtitle {
            font-size: 0.9rem;
        }
    }
`;