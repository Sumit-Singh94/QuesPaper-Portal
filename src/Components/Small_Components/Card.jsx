import React, { useContext } from 'react';
import styled from 'styled-components';
import Courses from '../../Courses';
import { Link, Navigate } from 'react-router-dom';
import { courseContext } from '../Context';


export const Card = ({course}) => {
  return (
    <StyledWrapper>
       <Link to={`/course/${course.coursecode}`}> </Link>
      <div className="card">
        <div className="content">
          <p className="heading">Card Hover Effect
          </p><p className="para">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
            laboriosam at voluptas minus culpa deserunt delectus sapiente
            inventore pariatur
          </p>
          <button className="btn">Read more</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    padding: 32px;
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    color: #e8e8e8;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content .heading {
    font-weight: 700;
    font-size: 32px;
  }

  .content .para {
    line-height: 1.5;
  }

  .content .btn {
    color: #e8e8e8;
    text-decoration: none;
    padding: 10px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .card:hover::before {
    height: 100%;
  }

  .card:hover {
    box-shadow: none;
  }

  .card:hover .btn {
    color: #212121;
    background: #e8e8e8;
  }

  .content .btn:hover {
    outline: 2px solid #e8e8e8;
    background: transparent;
    color: #e8e8e8;
  }

  .content .btn:active {
    box-shadow: none;
  }`;





export const Cardgrid = () => {

    const {listDocs} = useContext(courseContext);

    // Add error handling for empty or undefined listDocs
    if (!listDocs || listDocs.length === 0) {
        return <div className='text-center text-2xl mt-6'>No courses available</div>;
    }

    return (
        <div className='flex flex-wrap justify-center gap-4 p-4'>
            {listDocs.map((course) => (
              
                <Card 
                    key={course.$id} 
                    course={course} 
                />
            ))}
        </div>
    )
}