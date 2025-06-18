
import { useParams } from 'react-router-dom'
import Courses from '../../Courses';


export function Semesterpage() {

  const {coursecode}= useParams();


  
  


  return (
    <div>
     <p className='text-center text-red-600 text-5xl'>this is the coursecode selected:{coursecode}</p>
    </div>
  )


}




