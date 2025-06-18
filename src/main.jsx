import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HomeScreen } from "./Components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { courseContext } from "./Components/Context/ContextProvider.js";
import CourseContextProvider from "./Components/Context/ContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Semesterpage } from "./Components/HomePage/Semesterpage.jsx";


  const queryClient= new QueryClient()



const router = createBrowserRouter([
 {
  path: "/",
  element: <App />,
  children: [
   {
    path: "",
    element: <HomeScreen />,
   },
   {
    path: "/course/:coursecode",
    element: <Semesterpage />
   }
  ]
 }
])

createRoot(document.getElementById("root")).render(

 <StrictMode>

 <QueryClientProvider client={queryClient}>

<CourseContextProvider>

 <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />

</CourseContextProvider>

 </QueryClientProvider>



 
 </StrictMode>
)
