// Updated Coursepage.jsx with debugging
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Coursepage() {
  const { coursecode } = useParams()
  
  return (
    <div>
      <h1 className='text-red-600'>this is a coursepage: {coursecode}</h1>
    </div>
  )
}

export default Coursepage