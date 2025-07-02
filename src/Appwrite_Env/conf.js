

const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePapersCollectionId: String(import.meta.env.VITE_APPWRITE_PAPERS_COLLECTION_ID),
    appwriteSemesterCollectionId: String(import.meta.env.VITE_APPWRITE_SEMESTER_COLLECTION_ID),
    appwriteCoursesCollectionId: String(import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;
