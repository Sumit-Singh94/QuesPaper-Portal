import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { courseContext } from '../Context';
import { motion } from 'framer-motion';
import { Courses } from "../index";

const SectionHeader = ({ title, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', margin: '40px 0 20px' }}
    >
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#483d8b ' }}>{title}</h2>
        {subtitle && <p style={{ color: '#555', marginTop: '8px',fontWeight:500,fontSize:'1.2rem' }}>{subtitle}</p>}
    </motion.div>
);

export const Card = ({ course }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course.coursecode}`);
    };

    const courseData = Courses.find((c) => c.coursecode === course.coursecode);
    const semesterCount = courseData?.semesters?.length || 0;

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out group"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onClick={handleClick}
        >
            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm sm:text-lg">
                            {course.coursecode.charAt(0)}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full transition-all duration-300 ease-in-out">
                            {course.coursecode}
                        </span>
                    </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-all duration-300 ease-in-out group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {course.coursename}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 transition-all duration-300 ease-in-out">
                    {course.description}
                </p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 transition-all duration-300 ease-in-out">
                            {semesterCount} Semesters
                        </span>
                    </div>
                    
                    <motion.div
                        className="text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm transition-all duration-300 ease-in-out group-hover:text-blue-700 dark:group-hover:text-blue-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        View Details →
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

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
        color: white;
        transition: all 0.3s ease;
    }

    .card:hover .hover-indicator {
        bottom: 20px;
        transform: translateX(-50%) scale(1.1);
        background: rgba(255, 255, 255, 0.3);
    }

    .card:hover .hover-indicator span {
        transform: rotate(45deg);
    }
`;

const BackgroundWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 40px 20px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
        pointer-events: none;
    }
`;

const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 1;
`;

const EmptyStateWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    .empty-content {
        text-align: center;
        color: white;
    }

    .empty-icon {
        font-size: 64px;
        margin-bottom: 20px;
        opacity: 0.8;
    }

    .empty-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .empty-subtitle {
        font-size: 16px;
        opacity: 0.8;
    }
`;

// export const Cardgriddual = () => {
//     const {listDocs} = useContext(courseContext);

//     if (!listDocs || listDocs.length === 0) {
//         return (
//             <BackgroundWrapper>
//                 <SectionHeader
//                     title=" Please Select Your Course"
//                     subtitle="Check back later for new course updates"
//                 />
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                 >
//                     <EmptyStateWrapper>
//                         <div className='empty-content'>
//                             <div className='empty-icon'>📚</div>
//                             <div className='empty-title'>No courses available</div>
//                             <div className='empty-subtitle'>Check back later for updates</div>
//                         </div>
//                     </EmptyStateWrapper>
//                 </motion.div>
//             </BackgroundWrapper>
//         );
//     }

//     return (
//         <BackgroundWrapper>
//             <SectionHeader 
//                 title=" Please Select Your Course"
//                 subtitle="Discover your learning journey through our comprehensive course catalog"
//             />
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//             >
//                 <CardsContainer>
//                     {listDocs.map((course, index) => (
//                         <motion.div
//                             key={course.$id}
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: index * 0.1 }}
//                             viewport={{ once: true }}
//                         >
//                             <Card course={course} />
//                         </motion.div>
//                     ))}
//                 </CardsContainer>
//             </motion.div>
//         </BackgroundWrapper>
//     );
// }