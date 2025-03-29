import { useState, useEffect, useRef } from "react";
import "./App.css";
import Courses from "./Courses";
import Dbservice from "./Appwrite_Config/Appwrite_Databases";
import { ID } from "appwrite";
import { Loader } from "./Components/index";

function App() {
 const [uploaded, setuploaded] = useState(false);
 const [loading, setLoading] = useState(true);
 const [listDocs, setlistDocs] = useState([]);
 const [coursecode,setCourseCode]=useState([])

 let IsMounted = useRef(true);
                                                                                        
 useEffect(() => {
  
  const fetchCourses = async () => {
   try {
  const fetchedData=await Dbservice.getCourses()
  setlistDocs(fetchedData.documents)
  const codes=fetchedData.documents.map((val)=>(val.coursecode))
  setCourseCode([...new Set(codes)])
  
  } 
   catch (error) {
    console.log("Error::getcourses::error",error);
   }
  };
  fetchCourses()



  
  const handleUpload = async () => {
   if (!uploaded && IsMounted.current ) {
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
      <h1>Text Here</h1>
           {listDocs.map((val)=>(
            <ul key={val.$id}>
          {val.coursename}
            </ul>
         
           ))}
      
     </div>
    )}
   </div>
  </>
 );
}

export default App;
