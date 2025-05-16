import { Client, Databases, ID } from "appwrite";
import conf from "../Appwrite_Env/conf";
import Courses from "../Courses";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
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

    async getCourses(){
        try {

            const docs= await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCoursesCollectionId,
            )
            return docs;
            
        } 
        catch (error) {
            console.log("Error::getcourses::error",error);
            
        }
       
    }


    
    

       
   


}

const Dbservice = new Service();
export default Dbservice;
