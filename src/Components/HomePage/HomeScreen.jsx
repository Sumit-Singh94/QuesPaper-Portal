import { useState, useEffect, useRef, useContext } from "react";
import "../../App.css";
import { Courses } from "../index";
import { Dbservice } from "../index";
import { Card, Loader, Cardgrid } from "../index";
import { courseContext } from "../Context";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { LampEffect } from "../AceternityUI/LampEffect";
import { Helmet } from "react-helmet";

function HomeScreen() {
 const { setlistDocs } = useContext(courseContext);
 let IsMounted = useRef(true);


 
 const { data: fetchedDataDocuments, isLoading: loading } = useQuery({
  queryKey: ["fetchcourses"],
  queryFn: async () => {
   const fetchedData = await Dbservice.getCourses();
   const fetchedDataDocuments = fetchedData.documents;
   return fetchedDataDocuments;
  },
 });

 const coursesAndSemesterUploadMutation = useMutation({
  mutationFn: async () => {
   try {
    const existingCourseCode = fetchedDataDocuments.map(
     (val) => val.coursecode
    );
    const coursesToUpload = Courses.filter(
     (course) => !existingCourseCode.includes(course.coursecode)
    );

    if (coursesToUpload.length > 0) {
     await Dbservice.uploadCourses(coursesToUpload);
     await Dbservice.uploadSemester();
    }
    return coursesToUpload;
   } catch (error) {
    console.log("upload failed!! try again");
   }
  },

  onSuccess: () => {
   QueryClient.invalidateQueries(["fetchcourses"]);
  },
 });

 useEffect(() => {
  if (fetchedDataDocuments && !coursesAndSemesterUploadMutation.isSuccess) {
   coursesAndSemesterUploadMutation.mutate();
  }
 }, [fetchedDataDocuments]);

 useEffect(() => {
  if (fetchedDataDocuments) {
   setlistDocs(fetchedDataDocuments);
  }
 }, [fetchedDataDocuments, setlistDocs]);

 return (
  <>
  <Helmet>
  <title>MAKAUT PYQ Portal | Home</title>
  <meta name="description" content="Browse and download MAKAUT previous year question papers by course and semester. Free PDF downloads." />
  <link rel="canonical" href="https://www.makaut.co.in/" />
  <meta property="og:url" content="https://www.makaut.co.in/" />
</Helmet>

   {loading ? (
    <div className="flex justify-center items-center min-h-screen w-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
     <Loader />
    </div>
   ) : (
    <div className="w-full min-h-screen transition-all duration-300 ease-in-out">
     {fetchedDataDocuments ? (
      <LampEffect>
       <Cardgrid />
      </LampEffect>
     ) : (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
       <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-all duration-300 ease-in-out">Something went wrong!</h1>
        <p className="text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out">Please try refreshing the page.</p>
       </div>
      </div>
     )}
    </div>
   )}
  </>
 );
}

export default HomeScreen;
