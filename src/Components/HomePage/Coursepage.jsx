// Updated Coursepage.jsx with debugging
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Coursepage() {
  const { coursecode } = useParams()
  
  useEffect(() => {
    console.log("Coursepage component mounted with coursecode:", coursecode);
  }, [coursecode]);

  console.log("Coursepage render called with coursecode:", coursecode);

  return (
    <div>
      <h1 className='text-red-600'>this is a coursepage: {coursecode}</h1>
    </div>
  )
}

export default Coursepage