import { useState, useEffect, useRef } from "react";
import "../../App.css"
import {Courses} from "../index";
import {Dbservice} from "../index";
import { Card, Loader,Cardgrid } from '../index';


function HomeScreen() {
 const [uploaded, setuploaded] = useState(false)
 const [loading, setLoading] = useState(true);
 const [listDocs, setlistDocs] = useState([]);
 const [Dbcoursecode, setDbCourseCode] = useState([]);

 let IsMounted = useRef(true);


 useEffect(() => {
  // fetching courses from the database and saving it in the dbcoursescode then extracting the local codes and filtering out the newCourseCode which is not included in the database from them and uploading the new courses which matches with the new localCodes.

  //completed with fetching courses from database and preventing uploading duplicate courses and displaying the courses.

  const fetchAndUploadCourses = async () => { 

   try {

    if (!uploaded && IsMounted.current) {


     console.log("loading!!");

    const fetchedData = await Dbservice.getCourses();
  
     const codes = fetchedData.documents.map((val) => val.coursecode);
     setDbCourseCode([...new Set(codes)]);
    }
    
   } catch (error) {
    console.log("Error::getDbcourses::error", error);
   }




   try {

   const fetchedData = await Dbservice.getCourses();

    console.log("Starting uploading");

    const localCourseCodes = Courses.map((val) => (val.coursecode));
    const newLocalCourseCodes = localCourseCodes.filter((code) =>  (!Dbcoursecode.includes(code)));

    const coursesToUpload = Courses.filter((courses) =>
     newLocalCourseCodes.includes(courses.coursecode)
    );

    if (coursesToUpload.length > 0) {

     Dbservice.uploadCourses(coursesToUpload);
     Dbservice.uploadSemester();

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

   
    {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
        <Loader />
        </div>
       
    ) : (
        <div>
        <h1 className="text-center">Please Select A Course To See Papers </h1>
        <Cardgrid/> 
        </div>
      
  
    )}
  </>
 );
}

export default HomeScreen;
