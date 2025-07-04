import { Client, Databases, ID, Query,Storage } from "appwrite";
import conf from "../Appwrite_Env/conf";
import Courses from "../Courses";
import { Paperspage } from "../Components";
import { Await } from "react-router-dom";


export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage=new Storage(this.client)
  }


  async uploadCourses(coursesToUpload = Courses) {
    try {

      const results = []

      for (const course of coursesToUpload) {

        const existingDocs = await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCoursesCollectionId,
          [
            Query.equal("coursecode", course.coursecode)
          ]
        )

        if (!existingDocs?.documents) {
          throw new Error('Failed to check existing documents');
        }

        if (existingDocs.documents.length === 0) {

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
        conf.appwriteCoursesCollectionId,
        [
          Query.limit(100),
        ]

      )
      return docs
    } catch (error) {
      console.log("Error::getcourses::error", error);
      throw error
    }
  }




  async uploadSemester() {

    try {

      const semresult = []

      const fetchedsemcodes = await this.getSemester()

      const existingsemkeys = new Set(fetchedsemcodes.documents.map((semval) =>
        semval.$id))


      function generateSemId(coursecode, semester) {
        return `${coursecode}_${semester}`
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9._-]/g, "")
          .slice(0, 36);
      }

      for (const course of Courses) {
        //  console.log("Processing course:", course);

        if (!course.semesters || !Array.isArray(course.semesters)) {
          console.warn(`Course ${course.coursecode} missing or invalid semesters:`, course.semesters);
          continue; // Skip this course instead of failing
        }

        const { semesters, coursecode } = course

        for (const semester of semesters) {

          const semkeys = generateSemId(coursecode, semester)

          if (!existingsemkeys.has(semkeys)) {
            // console.log(`Semester Uploading: ${coursecode} - ${semesters}`);

            const semresults = await this.databases.createDocument(

              conf.appwriteDatabaseId,
              conf.appwriteSemesterCollectionId,
              semkeys,
              {
                semestername: semester,
                courseid: coursecode,

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
        [
          Query.limit(200),
        ],

      );
      return semdocs;
    }
    catch (error) {
      console.log("Error::getSemester::error", error);
      throw error
    }
  }


 async getFileDownload(bucketId, fileId) {
  try {
    // Validate inputs
    if (!bucketId || typeof bucketId !== 'string') {
      throw new Error(`Invalid bucket ID: ${bucketId}`);
    }
    
    if (!fileId || typeof fileId !== 'string') {
      throw new Error(`Invalid file ID: ${fileId}`);
    }
    
    console.log(`Downloading file: ${fileId} from bucket: ${bucketId}`);
    
    // The await IS working - it waits for the Promise to resolve/reject
    const fileDownload = await this.storage.getFileDownload(bucketId, fileId);
    
    // Validate response
    if (!fileDownload) {
      throw new Error("No response received from Appwrite");
    }
    
    // Handle different response types
    if (typeof fileDownload === 'string') {
      // Direct URL string
      return { href: fileDownload };
    } else if (fileDownload.href) {
      // URL object with href property
      return fileDownload;
    } else {
      // Unknown response format
      console.warn("Unexpected response format:", fileDownload);
      return fileDownload;
    }
    
  } catch (error) {
    // Handle different error types
    if (error.code === 404) {
      throw new Error("File not found. Check if the file ID is correct.");
    } else if (error.code === 401) {
      throw new Error("Permission denied. Check file permissions in Appwrite.");
    } else if (error.code === 400) {
      throw new Error("Invalid request. Check bucket ID and file ID.");
    } else {
      throw new Error(`Download failed: ${error.message}`);
    }
  }
}


// Updated getPapers function with proper format matching

  async getPapers(coursecode, semester) {
    try {
      // Converted coursecode to uppercase to match database format
      const normalizedCourseCode = coursecode?.toUpperCase();
      
      // Converted semester format from "semester X" to "sem-X"
      let normalizedSemester = semester?.toLowerCase();
      if (normalizedSemester?.startsWith('semester ')) {
        const semesterNumber = normalizedSemester.replace('semester ', '');
        normalizedSemester = `sem-${semesterNumber}`;
      }
      
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritePapersCollectionId,
        [
          Query.equal("coursecode", normalizedCourseCode),
          Query.equal("semester", normalizedSemester),
          Query.limit(10000)
        ]
      );
      
      console.log("Database response:", response);
      return response;
      
    } catch (error) {
      console.log("Error::getPapers::error", error);
      throw error;
    }
  }


}

const Dbservice = new Service();
export default Dbservice;