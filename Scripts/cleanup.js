import { Client, Storage, Query } from 'node-appwrite';
import conf from './conf.node.js';

// Validate config
if (!conf.appwriteUrl || !conf.appwriteProjectId || !conf.appwriteApiKey || !conf.appwriteBucketId) {
  console.error('❌ Missing Appwrite configuration. Please check your .env and conf.node.js');
  process.exit(1);
}

const client = new Client();
client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId)
  .setKey(conf.appwriteApiKey);

const storage = new Storage(client);
const bucketId = conf.appwriteBucketId;

// Delete all files in the bucket, handling pagination
async function deleteAllFiles() {
  try {
    let totalDeleted = 0;
    let cursor = undefined;
    while (true) {
      const queries = [Query.limit(200)];
      if (cursor) queries.push(Query.cursorAfter(cursor));
      const fileList = await storage.listFiles(bucketId, queries);
      if (!fileList.files.length) break;
      for (const file of fileList.files) {
        await storage.deleteFile(bucketId, file.$id);
        totalDeleted++;
        console.log(`🗑️ Deleted file: ${file.name || file.$id}`);
      }
      if (fileList.files.length < 100) break;
      cursor = fileList.files[fileList.files.length - 1].$id;
    }
    console.log(`🚀 All files deleted successfully! Total: ${totalDeleted}`);
  } catch (err) {
    console.error('❌ Error deleting files:', err.message || err);
  }
}

deleteAllFiles();
