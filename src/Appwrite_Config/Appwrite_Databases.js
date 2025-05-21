import { Client, Databases, ID } from "appwrite";
import conf from "../Appwrite_Env/conf";
import Courses from "../Courses";
import { configs } from "eslint-plugin-react-refresh";

export class Service {
 client = new Client();
 databases;

 constructor() {
  this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
  this.databases = new Databases(this.client);
 }

 async uploadCourses() {
  try {
   const results = [];
   for (const course of Courses) {
    const result = await this.databases.createDocument(
     conf.appwriteDatabaseId,
     conf.appwriteCoursesCollectionId,
     course.coursecode,
     {
      coursename: course.coursename,
      coursecode: course.coursecode,
     }
    );
    results.push(result);
   }
   return results;
  } catch (error) {
   console.error("Error uploading courses", error);
   throw error;
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
  }
 }



 async uploadSemester (){

  try {

    const  semresult=[]

   const fetchedsemcodes= await Dbservice.getSemester()

   const existingsemkeys=fetchedsemcodes.documents.map((semval)=>`${semval.courseid}-${semval.semestername}`)
    
      for ( const course of Courses){
        const {semesterName,coursecode}=course

         for (const semesters of semesterName){

          const semkeys=`${coursecode}-${semesters}`

          if (!existingsemkeys.includes(semkeys)) {
             const semresults= await this.databases.createDocument(

            conf.appwriteDatabaseId,
            conf.appwriteSemesterCollectionId,

         
            {
                semestername:semesters,
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
  }
 }
}

const Dbservice = new Service();
export default Dbservice;
