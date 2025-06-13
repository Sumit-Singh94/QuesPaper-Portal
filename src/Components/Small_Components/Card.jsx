import React, { useContext } from 'react';
import styled from 'styled-components';
import Courses from '../../Courses';
import { Link, Navigate } from 'react-router-dom';
import { courseContext } from '../Context';



export const Card = ({course}) => {


  return (
    <StyledWrapper>
    <Link to={`/course/${course.coursecode}`}>
      <div className="card text-center">
        <div className="card-details">
          <p className="text-title">{course.coursename}</p>
          <p className="text-body">Click Here To See Papers</p>
        </div>
      </div>  
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
   width: 190px;
   height: 254px;
   border-radius: 20px;
   background: #f5f5f5;
   position: relative;
   padding: 1.8rem;
   border: 2px solid #c3c6ce;
   transition: 0.5s ease-out;
   overflow: visible;
  }

  .card-details {
   color: black;
   height: 100%;
   gap: .5em;
   display: grid;
   place-content: center;
  }


  .text-body {
   color: rgb(134, 134, 134);
  }

  /*Text*/
  .text-title {
   font-size: 1.5em;
   font-weight: bold;
  }

  /*Hover*/
  .card:hover {
   border-color: #008bf8;
   box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
   transform: translate(-50%, 50%);
   opacity: 1;
  }`;



// ...existing code...

export const Cardgrid = () => {

    const {listDocs} = useContext(courseContext);

        console.log("listDocs inside Cardgrid:", listDocs);

    // Add error handling for empty or undefined listDocs
    if (!listDocs || listDocs.length === 0) {
        return <div>No courses available</div>;
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