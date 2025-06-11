import { Client, Databases, ID, Query } from "appwrite";
import conf from "../Appwrite_Env/conf";
import Courses from "../Courses";


export class Service {
 client = new Client();
 databases;

 constructor() {
  this.client.setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);
  this.databases = new Databases(this.client);
 }


 async uploadCourses(coursesToUpload = Courses) {
  try {

    const results = []

    for (const course of coursesToUpload ) {

      const existingDocs= await this.databases.listDocuments(
         conf.appwriteDatabaseId,
        conf.appwriteCoursesCollectionId,
        [
          Query.equal("coursecode",course.coursecode)
        ]
      )

        if (!existingDocs?.documents) {
          throw new Error('Failed to check existing documents');
        }

      if (existingDocs.documents.length===0){

      const result = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCoursesCollectionId,
       course.coursecode,
        {
          coursename: course.coursename,
          coursecode: course.coursecode,
        }
      )
        if (!result) {
            throw new Error(`Failed to create document for : ${course.coursecode}`);
          }
      results.push(result)
    }
  }
    return results;
  } catch (error) {
    console.error("Error uploading courses", error)
   throw error
  }
  }



 async getCourses() {
  try {
   const docs = await this.databases.listDocuments(
    conf.appwriteDatabaseId,
    conf.appwriteCoursesCollectionId
   );
   return docs;
  } catch (error) {
   console.log("Error::getcourses::error", error);
   throw error
  }
 }




 async uploadSemester (){

  try {

    const  semresult=[]

   const fetchedsemcodes = await this.getSemester()

   const existingsemkeys=new Set(fetchedsemcodes.documents.map((semval)=>
     semval.$id))


  function generateSemId(coursecode,semester){
            return `${coursecode}_${semester}`
            .replace(/\s+/g, "_") 
            .replace(/[^a-zA-Z0-9._-]/g, "")
             .slice(0, 36);
          }
     
      for ( const course of Courses){
        //  console.log("Processing course:", course);

            if (!course.semesters || !Array.isArray(course.semesters)) {
        console.warn(`Course ${course.coursecode} missing or invalid semesters:`, course.semesters);
        continue; // Skip this course instead of failing
      }
        
        const {semesters,coursecode}=course
          
         for (const semester of semesters){

          const semkeys=generateSemId(coursecode,semester)

          if (!existingsemkeys.has(semkeys)) {
            // console.log(`Semester Uploading: ${coursecode} - ${semesters}`);

             const semresults= await this.databases.createDocument(

            conf.appwriteDatabaseId,
            conf.appwriteSemesterCollectionId,
            semkeys,
            {
                semestername:semester,
                courseid:coursecode,

            }
          )
           semresult.push(semresults)
          }
        
    };
        
      }
       return semresult
   
  } catch (error) {
     console.log("Error::uploadSemester::error", error);
     throw error
  }
  
 }







 async getSemester() {

  try {

   const semdocs = await this.databases.listDocuments(

      conf.appwriteDatabaseId,
     conf.appwriteSemesterCollectionId,

   );
   return semdocs;
  }
   catch (error) {
   console.log("Error::getSemester::error", error);
   throw error
  }
 }
}

const Dbservice = new Service();
export default Dbservice;