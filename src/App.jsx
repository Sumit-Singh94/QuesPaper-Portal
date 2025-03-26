import { useState, useEffect, useRef } from "react";
import "./App.css";
import Courses from "./Courses";
import Dbservice from "./Appwrite_Config/Appwrite_Databases";
import { ID } from "appwrite";
import { Loader } from "./Components/index";

function App() {
 const [uploaded, setuploaded] = useState(false);
 const [loading, setLoading] = useState(true);

 let IsMounted = useRef(true);

 useEffect(() => {
  const handleUpload = async () => {
   if (!uploaded && IsMounted.current) {
    try {
     await Dbservice.uploadCourses(Courses);
     setuploaded(true);
     setLoading(false);
     console.log("Course Uploaded Successfully!");
    } catch (error) {
     console.log("Course Not Uploaded");
    }
   }
  };
  handleUpload();

  return () => {
   IsMounted.current = false;
  };
  
 }, [uploaded]);

 return (
  <>
   <p></p>

   <div>
    {loading ? (
     <Loader />
    ) : (
     <div>
      {Courses.map((course) => (
       <ul key={ID.unique()}>{course.coursename}</ul>
      ))}
     </div>
    )}
   </div>
  </>
 );
}

export default App;
