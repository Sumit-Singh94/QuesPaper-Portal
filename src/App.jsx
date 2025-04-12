import { useState, useEffect, useRef } from "react";
import "./App.css";
import Courses from "./Courses";
import Dbservice from "./Appwrite_Config/Appwrite_Databases";
import { ID } from "appwrite";
import { Card, Loader,Cardgrid } from "./Components/index";
import { ifError } from "assert";

function App() {
 const [uploaded, setuploaded] = useState(false)
 const [loading, setLoading] = useState(true);
 const [listDocs, setlistDocs] = useState([]);
 const [Dbcoursecode, setDbCourseCode] = useState([]);

 let IsMounted = useRef(true);

 useEffect(() => {
  // fetching courses from the database and saving it in the dbcoursescode then extracting the local codes and filtering out the newCourseCode which is not included in the database from them and uploading the new courses which matches with the new localCodes.

  //completed with fetching courses from database and preventing uploading duplicate courses and displaying the courses.

  const fetchAndUploadCourses = async () => {
   let fetchedData;

   try {
    if (!uploaded && IsMounted.current) {
     console.log("loading!!");

    fetchedData = await Dbservice.getCourses();
     const codes = fetchedData.documents.map((val) => val.coursecode);
     setDbCourseCode([...new Set(codes)]);
    }
    
   } catch (error) {
    console.log("Error::getDbcourses::error", error);
   }

   try {

    fetchedData = await Dbservice.getCourses();
    console.log("Starting uploading");

    const localCourseCodes = Courses.map((val) => (val.coursecode));
    const newLocalCourseCodes = localCourseCodes.filter((code) =>  (!Dbcoursecode.includes(code))
      
    );

    const coursesToUpload = Courses.filter((courses) =>
     newLocalCourseCodes.includes(courses.coursecode)
    );

    if (coursesToUpload.length > 0 ) {
    Dbservice.uploadCourses(coursesToUpload);
     

     setuploaded(true),
     setlistDocs(fetchedData.documents);
     setLoading(false);
    }
   } catch (error) {
    console.error("Upload failed:", error);
   }

   if (IsMounted.current) {
    setLoading(false);
   }
  
  };

  fetchAndUploadCourses()
  

  return () => {
   IsMounted.current = false;
  };
 }, []);

 

 return (
  <>

   <div> 
   
    {loading ? (
        <Loader />
    
    ) : (
     <div className="text-center flex flex-col items-center">
      <h1 className="text-center">Please Select A Course</h1>
      <Cardgrid/> 
     </div>
    )}
   </div>
  </>
 );
}

export default App;
