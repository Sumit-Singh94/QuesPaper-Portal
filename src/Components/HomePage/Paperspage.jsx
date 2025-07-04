import { useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Dbservice from "../../Appwrite_Config/Appwrite_Databases";
import conf from "../../Appwrite_Env/conf";

export function Paperspage() {
 const { coursecode, semester } = useParams();

 const handleDownload = async (paper) => {
    try {
      if (!paper || typeof paper !== 'object') {
        throw new Error("Invalid paper data provided");
      }
      
      if (!paper.file_url) {
        throw new Error("Download URL not available");
      }
      
      // Create secure download link using file_url
      const link = document.createElement('a');
      link.href = paper.file_url;
      link.download = paper.original_filename || 'document.pdf';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log("✅ Download started successfully");
      
    } catch (error) {
      console.error("Download failed:", error.message);
      alert(`Download failed: ${error.message}`);
    }
  };


 const {
  data: papers,
  isLoading,
  isError,
  error,
 } = useQuery({
  queryKey: ["papers", coursecode, semester],
  queryFn: async () => {
   const response = await Dbservice.getPapers(coursecode, semester);

   console.log("Query response:", response);
   return response && response.documents ? response.documents : [];
  },
 });

 return (
  <>
   <div className="px-4 py-8 flex flex-col items-center gap-6 bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
     {coursecode} <span className="text-indigo-500">/</span> {semester}
    </h2>

    {isLoading ? (
     <p className="text-gray-500 text-lg">Loading papers...</p>
    ) : isError ? (
     <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded shadow">
      <p>Error loading papers:</p>
      <p className="text-sm mt-1">{error?.message || "Unknown error"}</p>
     </div>
    ) : !papers || papers.length === 0 ? (
     <div className="text-center text-gray-600 bg-white p-6 rounded-lg shadow-sm w-full max-w-xl">
      <p className="text-lg font-medium">No papers found for this semester.</p>
      <p className="text-sm text-gray-400 mt-2">
       Searched for:{" "}
       <strong>
        {coursecode?.toUpperCase()} - sem-{semester?.replace("semester ", "")}
       </strong>
      </p>
     </div>
    ) : (
     <div className="w-full max-w-5xl">
      <p className="text-center mb-6 text-gray-600">
       🎓 Found <strong>{papers.length}</strong> paper
       {papers.length > 1 ? "s" : ""}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
       {papers.map((paper) => (
        <div
         key={paper.$id}
         className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition hover:shadow-lg"
        >
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {paper.subject_name || paper.original_filename}
         </h3>

         <ul className="text-sm text-gray-500 flex flex-wrap gap-3 mb-4">
          <li>📅 Year: {paper.year || "N/A"}</li>
          <li>📘 Course: {paper.coursecode}</li>
          <li>📚 Semester: {paper.semester}</li>
          {paper.file_size && (
           <li>📄 Size: {(paper.file_size / 1024 / 1024).toFixed(2)} MB</li>
          )}
         </ul>

         {paper.file_url ? (
          <div className="flex flex-wrap gap-3">
               <button
                        type="button"
                        onClick={() =>
                          window.open(paper.file_url, "_blank", "noopener,noreferrer")
                        }
                        className="!bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 transition"
                      >
                        View PDF
                      </button>
          </div>
         ) : (
          <p className="text-red-500 text-sm">File URL not available</p>
         )}
        </div>
       ))}
      </div>
     </div>
    )}
   </div>
  </>
 );
}
