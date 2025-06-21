
import { useParams } from 'react-router-dom'
import {Courses} from '../index'
import HoverSemCards from '../Small_Components/SemesterCard'
import {SemCard} from "../index"

export function Semesterpage() {

  const {coursecode}= useParams()


    const Iscodes=Courses.find((course)=>(  coursecode === course.coursecode))

    if (Iscodes) {

    const SemesterArray= Iscodes.semesters

    return (

    <div className='flex flex-wrap justify-center gap-6 p-4 max-w-6xl mx-auto'>

          {
            SemesterArray.map((sem)=>(
              <SemCard key={sem} 
                      title={sem}
                      subtitle={"Access previous year question papers"}

                      />
            ))
          }
    

    </div>
    )

    }





 
}






