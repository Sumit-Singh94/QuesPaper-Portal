import { useState, useEffect, useRef, useContext } from "react";
import "../../App.css";
import { Courses } from "../index";
import { Dbservice } from "../index";
import { Card, Loader, Cardgrid } from "../index";
import { courseContext } from "../Context";
import { useQuery } from "@tanstack/react-query";



function HomeScreen() {


 const { setlistDocs } = useContext(courseContext);
//  const [loading, setLoading] = useState(true);
 let IsMounted = useRef(true)


 const {data:fetchedDataDocuments,isLoading:loading}=useQuery({
    queryKey:["fetchcourses"],
    queryFn: async ()=>{
       const fetchedData= await Dbservice.getCourses()
      const fetchedDataDocuments= fetchedData.documents
      return fetchedDataDocuments;
    },

   

    
 })
     








//   const fetchAndUploadCourses = async () => {
//    try {
//     if (IsMounted.current) {
//      console.log("started fetching and uploading process!!");

//      const fetchedData = await Dbservice.getCourses();
//      setlistDocs(fetchedData.documents)
//      const existingcodes = fetchedData.documents.map((val) => val.coursecode);

//      console.log("fetchedData data is :", fetchedData.documents);

//      console.log("Starting upload process");

//      const coursesToUpload = Courses.filter(
//       (courses) => !existingcodes.includes(courses.coursecode)
//      );

//      // const finalData = fetchedData.documents;

//      if (coursesToUpload.length > 0) {
//       await Dbservice.uploadCourses(coursesToUpload);
//       // setlistDocs(updatedData.documents);
//      }

//      // let finalData=updatedData.documents

//      const finalData = await Dbservice.getCourses();

//      if (IsMounted.current) {
//       setlistDocs(finalData.documents);

//       try {
//        await Dbservice.uploadSemester();
//       } catch (semesterError) {
//        console.warn("Semester upload failed:", semesterError);
//       }

//       setLoading(false)
//      }

//      if (IsMounted.current) {
//       setLoading(false);
//      }
//     }
//    } catch (error) {
//     console.log("Error::getDbcourses::error", error);
//     if (IsMounted.current) {
//      setLoading(false);
//     }
//    }
//   };

//   fetchAndUploadCourses();

//   return () => {
//    IsMounted.current = false;
//   };

 return (
  <>
   {loading ? (
    <div className="flex justify-center items-center min-h-screen w-full">
     <Loader />
    </div>
   ) : (
    <div>
     <h1 className="text-center">Please Select A Course To See Papers </h1>
     <Cardgrid Courses={fetchedDataDocuments}/>
    </div>
   )}
  </>
 );
}

export default HomeScreen;
