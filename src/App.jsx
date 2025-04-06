import { useState, useEffect, useRef } from "react";
import "./App.css";
import Courses from "./Courses";
import Dbservice from "./Appwrite_Config/Appwrite_Databases";
import { ID } from "appwrite";
import { Loader } from "./Components/index";

function App() {
 const [uploaded, setuploaded] = useState(()=>(
  localStorage.getItem("coursesuploaded")==="true"
 ));
 const [loading, setLoading] = useState(true);
 const [listDocs, setlistDocs] = useState([]);
 const [Dbcoursecode, setDbCourseCode] = useState([]);

 let IsMounted = useRef(true);

 useEffect(() => {
  // fetching courses from the databases and extracting the coursecode for compare and saving it in the dbcoursescode

  const fetchCourses = async () => {
   try {
    if (IsMounted.current) {
     console.log("loading!!");
     const fetchedData = await Dbservice.getCourses();
     setlistDocs(fetchedData.documents);

     const codes = fetchedData.documents.map((val) => val.coursecode);
     setDbCourseCode([...new Set(codes)]);
    }
   } catch (error) {
    console.log("Error::getDbcourses::error", error);
   }
  };
  fetchCourses();

  return () => {
   IsMounted.current = false;
  };
 }, []);

 useEffect(() => {
  const handleUpload = async () => {
   if (!uploaded && IsMounted.current) {
    try {
     console.log("Starting uploading");
     const localCourseCodes = Courses.map((val) => (val.coursecode));

     const newLocalCourseCodes = localCourseCodes.filter((code) =>  (!Dbcoursecode.includes(code))
       
     );

     const coursesToUpload = Courses.filter((courses) =>
      newLocalCourseCodes.includes(courses.coursecode)
     );

     if (coursesToUpload.length > 0 && IsMounted.current) {
      await Dbservice.uploadCourses(coursesToUpload);
      localStorage.setItem("coursesuploaded", "true")

      setuploaded(true);
      setLoading(false);
     }
    } catch (error) {
     console.error("Upload failed:", error);
    }
   } else {

    if (IsMounted.current) {
     setLoading(false);
    }
   }
  };

  handleUpload();
 }, [Dbcoursecode, uploaded]);

 return (
  <>
   <p></p>

   <div>
    {loading ? (
     <Loader />
    ) : (
     <div>
      <h1>Text Here</h1>
      {listDocs.map((val) => (
       <ul key={val.$id}>{val.coursename}</ul>
      ))}
     </div>
    )}
   </div>
  </>
 );
}

export default App;
