import { useState, useEffect, useRef, Children, useContext } from "react";
import "../../App.css"
import {Courses} from "../index";
import {Dbservice} from "../index";
import { Card, Loader,Cardgrid } from '../index';
import { courseContext } from "../Context";

function HomeScreen() {

  const {setlistDocs} = useContext(courseContext)

 const [uploaded, setuploaded] = useState(false)
 const [loading, setLoading] = useState(true);
 const [Dbcoursecode, setDbCourseCode] = useState([]);

 let IsMounted = useRef(true);


 useEffect(() => {
  // fetching courses from the database and saving it in the dbcoursescode then extracting the local codes and filtering out the newCourseCode which is not included in the database from them and uploading the new courses which matches with the new localCodes.

  //completed with fetching courses from database and preventing uploading duplicate courses and displaying the courses.

  const fetchAndUploadCourses = async () => { 
   let fetchedData
   

   try {

    if (!uploaded && IsMounted.current) {


     console.log("loading!!");

     fetchedData = await Dbservice.getCourses();
  
     const codes = fetchedData.documents.map((val) => val.coursecode);
     setDbCourseCode([...new Set(codes)]);
    }

     console.log("Starting uploading");

    const localCourseCodes = Courses.map((val) => (val.coursecode));
    const newLocalCourseCodes = localCourseCodes.filter((code) =>  (!Dbcoursecode.includes(code)));

    const coursesToUpload = Courses.filter((courses) =>
     newLocalCourseCodes.includes(courses.coursecode)
    );


    if (coursesToUpload.length > 0) {

     await Dbservice.uploadCourses(coursesToUpload);

    //  updatedData= await Dbservice.getCourses()
     setuploaded(true),
     setlistDocs(updatedData.documents);
     setLoading(false);
    }
    else
    {
       updatedData = await Dbservice.getCourses();

      // await Dbservice.uploadSemester()
     setuploaded(true),
    //  setlistDocs(updatedData.documents);
     setLoading(false);
    }


   if (IsMounted.current) {
    setLoading(false);
   }
  
    
   } 
   
   
   catch (error) {
    console.log("Error::getDbcourses::error", error);
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
