import { useState, useEffect, useRef, useContext } from "react";
import "../../App.css"
import {Courses} from "../index";
import {Dbservice} from "../index";
import { Card, Loader,Cardgrid } from '../index';
import { courseContext } from "../Context";

function HomeScreen() {

  const {setlistDocs} = useContext(courseContext)

 const [loading, setLoading] = useState(true);
//  const [Dbcoursecode, setDbCourseCode] = useState([]);

 let IsMounted = useRef(true);


 useEffect(() => {
  // fetching courses from the database and saving it in the dbcoursescode then extracting the local codes and filtering out the newCourseCode which is not included in the database from them and uploading the new courses which matches with the new localCodes.

  //completed with fetching courses from database and preventing uploading duplicate courses and displaying the courses.

  const fetchAndUploadCourses = async () => { 
   
    let updatedData=[]  

   try {

    if ( IsMounted.current) {

     console.log("started fetching and uploading process!!");


    const fetchedData = await Dbservice.getCourses();
    const existingcodes = fetchedData.documents.map((val) => val.coursecode)
  
      console.log("fetchedData data is :",fetchedData.documents)

    
     console.log("Starting upload process");

    const coursesToUpload = Courses.filter((courses) =>
     !existingcodes.includes(courses.coursecode)
    );


    // const finalData = fetchedData.documents;

    if (coursesToUpload.length > 0) {

     await Dbservice.uploadCourses(coursesToUpload);
    // setlistDocs(updatedData.documents);   
    }

      // let finalData=updatedData.documents
     


   try {
        await Dbservice.uploadSemester()

    } 
    catch (semesterError) {
        console.log("Semester upload failed, but continuing:", semesterError);
    }

   const finalData=await Dbservice.getCourses()
      // console.log("Data set in context:", finalData.documents)
          

    if (IsMounted.current) {
      setlistDocs(finalData.documents);
      console.log("Data set in context:", finalData.documents)
      setLoading(false)
  
    }

  }
}
  
  catch (error) {
    console.log("Error::getDbcourses::error", error);
     if (IsMounted.current) {
     setLoading(false)
    }
   }
  }



  fetchAndUploadCourses();
  

  return () => {
   IsMounted.current = false
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