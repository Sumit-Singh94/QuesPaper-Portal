import { useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Dbservice from "../../Appwrite_Config/Appwrite_Databases";
import conf from "../../Appwrite_Env/conf";


export function Paperspage() {

    const { coursecode, semester } = useParams();

    const normalizedCourse = coursecode.toLowerCase();
const normalizedSemester = semester.toLowerCase();

const { data: papers, isLoading, isError } = useQuery({
  queryKey: ['papers', coursecode, semester],
  queryFn: async () => {
      const response = await Dbservice.getPapers(normalizedCourse, normalizedSemester);
      console.log("response:",response)
      // Ensure documents is always an array
      return response && response.documents ? response.documents : [];
    }
});


//  Function to construct proper file URL
    const getFileUrl = (paper) => {
        // Use the file_url if available (from your upload script)
        if (paper.file_url) {
            return paper.file_url;
        }
        
        // Fallback: construct URL manually using file_id
        if (paper.file_id) {
            return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${paper.file_id}/view?project=${conf.appwriteProjectId}`;
        }
        
        return null;
    };


  return (
    <>
      <div className="p-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold capitalize">
          {coursecode} - {semester}
        </h2>

        {isLoading ? (
          <p>Loading papers...</p>
        ) : isError ? (
          <div className="text-red-600 p-4 border border-red-300 rounded">
            <p>Error loading papers: {isError?.message || 'Unknown error'}</p>
          </div>
        ) : !papers || papers.length === 0 ? (
          <div className="text-center p-4">
            <p>No papers found for {coursecode} - {semester}</p>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <p className="text-center mb-4 text-gray-600">
              Found {papers.length} papers
            </p>
            <div className="grid gap-4">
              {papers.map(paper => {
                const fileUrl = getFileUrl(paper)

                return (
                  <div key={paper.$id} className="border p-4 rounded shadow-md bg-white">
                    <h3 className="text-lg font-semibold mb-2">
                      {paper.subject_name || paper.original_filename}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span>Year: {paper.year || 'N/A'}</span>
                      <span>Course: {paper.coursecode}</span>
                      <span>Semester: {paper.semester}</span>
                      {paper.file_size && (
                        <span>Size: {(paper.file_size / 1024 / 1024).toFixed(2)} MB</span>
                      )}
                    </div>

                    {fileUrl ? (
                      <div className="flex gap-2">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View PDF
                        </a>
                        <a
                          href={fileUrl + '&mode=download'}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                        >
                          Download PDF
                        </a>
                      </div>
                    ) : (
                      <p className="text-red-600">File URL not available</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

