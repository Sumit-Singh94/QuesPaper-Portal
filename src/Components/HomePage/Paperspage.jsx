import { useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Dbservice from "../../Appwrite_Config/Appwrite_Databases";


export function Paperspage() {

    const { coursecode, semester } = useParams();

    const normalizedCourse = coursecode.toLowerCase();
const normalizedSemester = semester.toLowerCase();

const { data: papers,isLoading,isError } = useQuery({
  queryKey: ['papers', coursecode, semester],
  queryFn: async () => {
      const response = await Dbservice.getPapers(normalizedCourse, normalizedSemester);
      console.log('Query response:', response);

      return response.documents;
      
    }
});

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
            </div> ) : papers.length === 0 ? (
      <p>No papers found.</p>
         ) : (
      papers.map(paper => (
        <div key={paper.$id} className="border p-4 rounded w-full max-w-xl shadow-md">
          <h3 className="text-lg font-semibold">{paper.subject_name || paper.original_filename}</h3>
          <p>Year: {paper.year || 'N/A'}</p>
          <a
            href={`https://[HOST]/v1/storage/buckets/[BUCKET_ID]/files/${paper.fileId}/view?project=[PROJECT_ID]&mode=download`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Download PDF
          </a>
        </div>
      ))
    )}
  </div>


    </>
  )
}

