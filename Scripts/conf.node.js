// scripts/conf.node.js
import dotenv from 'dotenv';
dotenv.config();

const conf = {
  appwriteUrl: process.env.VITE_APPWRITE_URL,
  appwriteProjectId: process.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: process.env.VITE_APPWRITE_DATABASE_ID,
  appwritePapersCollectionId: process.env.VITE_APPWRITE_PAPERS_COLLECTION_ID,
  appwriteSemesterCollectionId: process.env.VITE_APPWRITE_SEMESTER_COLLECTION_ID,
  appwriteCoursesCollectionId: process.env.VITE_APPWRITE_COURSES_COLLECTION_ID,
  appwriteBucketId: process.env.VITE_APPWRITE_BUCKET_ID,
  appwriteApiKey : process.env.VITE_APPWRITE_API_KEY,
};

export default conf;
