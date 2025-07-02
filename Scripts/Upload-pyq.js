import { Client, Databases, Storage, ID } from 'node-appwrite';
import fs from 'fs-extra';
import path from 'path';
import conf from './conf.node.js';

// Configuration
const config = {
  // Appwrite Configuration
  endpoint: conf.appwriteUrl, 
  projectId: conf.appwriteProjectId, 
  apiKey: conf.appwriteApiKey,
  databaseId: conf.appwriteDatabaseId,
  pyqCollectionId: conf.appwritePapersCollectionId, 
  storageBucketId: conf.appwriteBucketId,
  
  // Local Configuration
  pyqFolderPath: 'D:\\FrontendDevelopment\\QuesPaper-Portal\\src\\PYQ'
};

// Initialize Appwrite
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setKey(config.apiKey);

const databases = new Databases(client);
const storage = new Storage(client);

// Utility function to parse filename and extract metadata
function parseFilename(filename) {
  const nameWithoutExt = path.parse(filename).name;
  
  // Extract year (last part that's a 4-digit number)
  const yearMatch = nameWithoutExt.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : 'unknown';
  
  let subject = nameWithoutExt
    // Remove any 3-letter course codes at start (bca, bba, mca, cse, etc.)
    .replace(/^[a-z]{2,4}-/i, '')
    // Remove any 3-letter course codes in middle (more flexible)
    .replace(/-[a-z]{2,4}-/i, '-')
    // Remove subject code numbers (like 201, 301, etc.)
    .replace(/-\d{3}-/g, '-')
    // Remove year at end
    .replace(/-\d{4}$/g, '')
    // Clean up multiple dashes
    .replace(/-+/g, '-')
    // Remove leading/trailing dashes
    .replace(/^-|-$/g, '')
    // Convert to readable format
    .replace(/-/g, ' ')
    .trim();
  
  return {
    subject: subject || 'unknown-subject',
    year: year
  };
}

// Function to read folder structure and get all PDF files
async function readFolderStructure(folderPath) {
  const files = [];
  
  try {
    const courses = await fs.readdir(folderPath);
    
    for (const course of courses) {
      const coursePath = path.join(folderPath, course);
      const courseStats = await fs.stat(coursePath);
      
      if (courseStats.isDirectory()) {
        const semesters = await fs.readdir(coursePath);
        
        for (const semester of semesters) {
          const semesterPath = path.join(coursePath, semester);
          const semesterStats = await fs.stat(semesterPath);
          
          if (semesterStats.isDirectory()) {
            const pdfFiles = await fs.readdir(semesterPath);
            
            for (const pdfFile of pdfFiles) {
              if (path.extname(pdfFile).toLowerCase() === '.pdf') {
                const filePath = path.join(semesterPath, pdfFile);
                const parsed = parseFilename(pdfFile);
                
                files.push({
                  coursecode: course,
                  semester: semester,
                  filename: pdfFile,
                  filepath: filePath,
                  subject: parsed.subject,
                  year: parsed.year
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading folder structure:', error);
    throw error;
  }
  
  return files;
}


function generateStorageId(fileData) {
  const cleanFilename = fileData.filename
    .replace(/\.pdf$/i, '')  // Remove .pdf extension
    .replace(/[^a-zA-Z0-9]/g, '_')  // Replace special chars with underscore
    .toLowerCase();
  
  const id = `${fileData.coursecode}_${fileData.semester}_${cleanFilename}`.toLowerCase();
  
  // Ensure ID doesn't exceed Appwrite's limit (36 chars)
  if (id.length > 36) {
    return id.substring(0, 36);
  }
  
  return id;
}

function generateDatabaseId(fileData) {
  // Create simple ID from file metadata
  const cleanFilename = fileData.filename
    .replace(/\.pdf$/i, '')  // Remove .pdf extension
    .replace(/[^a-zA-Z0-9]/g, '_')  // Replace special chars with underscore
    .toLowerCase();
  
  const id = `doc_${fileData.coursecode}_${fileData.semester}_${cleanFilename}`.toLowerCase();
  
  // Ensure ID doesn't exceed Appwrite's limit (36 chars)
  if (id.length > 36) {
    return id.substring(0, 36);
  }
  
  return id;
}



async function uploadToStorage(filepath, filename, fileData) {
  console.log(`📤 Preparing to upload: ${filename}`);

  if (!fs.existsSync(filepath)) {
    throw new Error(`❌ File does not exist at path: ${filepath}`);
  }

  const stats = await fs.stat(filepath);
  if (!stats.isFile() || stats.size === 0) {
    throw new Error(`❌ Invalid or empty file: ${filepath}`);
  }


  // Generate simple Predictable ID
  const fileId = generateStorageId(fileData);

  try {
    // Check if file already exists
    try {
      const existingFile = await storage.getFile(config.storageBucketId, fileId);
      console.log(`⏭️  File already exists in storage: ${filename}`);
      return existingFile;
    } catch (err) {
      // File doesn't exist, proceed with upload
      if (err.code !== 404) {
        throw err;
      }
    }

    const fileBuffer = await fs.readFile(filepath);
    
    const file = new File([fileBuffer], filename, { 
      type: 'application/pdf',
      lastModified: stats.mtime.getTime()
    });
    
    // Use simple Predictable ID
    const result = await storage.createFile(
      config.storageBucketId,
      fileId,
      file
    );
    
    console.log(`✅ Successfully uploaded: ${filename} (ID: ${result.$id})`);
    return result;
  } catch (err) {
    console.error(`❌ Upload failed for ${filename}:`, err.message);
    throw err;
  }
}


// Function to create database entry
async function createDatabaseEntry(fileData, storageFile) {
  // Generate simple Predictable database ID
  const docId = generateDatabaseId(fileData);
  
  try {
    // Check if document already exists
    try {
      const existingDoc = await databases.getDocument(
        config.databaseId,
        config.pyqCollectionId,
        docId
      );
      console.log(`⏭️  Database entry already exists for ${fileData.filename}`);
      return existingDoc;
    } catch (err) {
      // Document doesn't exist, proceed with creation
      if (err.code !== 404) {
        throw err;
      }
    }

    const fileUrl = `${config.endpoint}/storage/buckets/${config.storageBucketId}/files/${storageFile.$id}/view?project=${config.projectId}`;
    
    // Use simple Predictable ID
    const document = await databases.createDocument(
      config.databaseId,
      config.pyqCollectionId,
      docId,
      {
        coursecode: fileData.coursecode,
        semester: fileData.semester,
        subject_name: fileData.subject,
        year: fileData.year,
        file_id: storageFile.$id,
        file_url: fileUrl,
        original_filename: fileData.filename,
        upload_date: new Date().toISOString(),
        file_size: storageFile.sizeOriginal
      }
    );
    
    console.log(`✅ Database entry created for ${fileData.filename}`);
    return document;
  } catch (error) {
    console.error(`❌ Failed to create database entry for ${fileData.filename}:`, error);
    throw error;
  }
}



// Main function to process all files
async function processAllFiles() {
  try {
    console.log('🚀 Starting PYQ upload process...');
    console.log(`📁 Reading files from: ${config.pyqFolderPath}`);
    
    // Read all PDF files
    const files = await readFolderStructure(config.pyqFolderPath);
    console.log(`📄 Found ${files.length} PDF files to process`);
    
    if (files.length === 0) {
      console.log('❌ No PDF files found in the specified directory');
      return;
    }
    
    let successCount = 0;
    let failureCount = 0;
    const failures = [];
    
    // Process files one by one (to avoid overwhelming the server)
    for (let i = 0; i < files.length; i++) {
      const fileData = files[i];
      console.log(`\n📤 Processing ${i + 1}/${files.length}: ${fileData.filename}`);
      console.log(`   Course: ${fileData.coursecode}, Semester: ${fileData.semester}`);
      console.log(`   Subject: ${fileData.subject}, Year: ${fileData.year}`);
      
      try {
        // Upload to storage
        const storageFile = await uploadToStorage(fileData.filepath, fileData.filename,fileData);
        
        // Create database entry
        await createDatabaseEntry(fileData, storageFile);
        
        successCount++;
        console.log(`✅ Successfully processed ${fileData.filename}`);
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        failureCount++;
        failures.push({
          filename: fileData.filename,
          error: error.message
        });
        console.error(`❌ Failed to process ${fileData.filename}`);
      }
    }
    
    // Summary
    console.log('\n📊 Upload Summary:');
    console.log(`✅ Successful uploads: ${successCount}`);
    console.log(`❌ Failed uploads: ${failureCount}`);
    
    if (failures.length > 0) {
      console.log('\n❌ Failed files:');
      failures.forEach(failure => {
        console.log(`   - ${failure.filename}: ${failure.error}`);
      });
    }
    
    console.log('\n🎉 Upload process completed!');
    
  } catch (error) {
    console.error('💥 Fatal error during upload process:', error);
  }
}

// Function to test configuration
async function testConfiguration() {
  try {
    console.log('🔧 Testing Appwrite connection...');
    
    // Test database connection
    await databases.list();
    console.log('✅ Database connection successful');
    
    // Test storage connection
    await storage.listBuckets();
    console.log('✅ Storage connection successful');
    
    // Test local folder access
    const folderExists = await fs.pathExists(config.pyqFolderPath);
    if (folderExists) {
      console.log('✅ Local PYQ folder accessible');
    } else {
      console.log('❌ Local PYQ folder not found');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Configuration test failed:', error);
    return false;
  }
}

// Main execution
async function main() {
  console.log('🎯 PYQ Upload Script Starting...\n');
  
  // Test configuration first
  const configValid = await testConfiguration();
  if (!configValid) {
    console.log('❌ Please fix configuration issues before proceeding');
    return;
  }
  
  console.log('\n✅ Configuration test passed, starting upload...\n');
  
  // Process all files
  await processAllFiles();
}

// Run the script
main().catch(console.error);