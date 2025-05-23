import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Coursepage, HomeScreen } from "./Components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { courseContext } from "./Components/Context/ContextProvider.js";
import CourseContextProvider from "./Components/Context/ContextProvider.jsx";

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
    path: "courses",
    element: <HomeScreen />
   },
   {
    path: "/course/:coursecode",
    element: <Coursepage />
   }
  ]
 }
])

createRoot(document.getElementById("root")).render(

 <StrictMode>

<CourseContextProvider>

 <RouterProvider router={router} />

</CourseContextProvider>





 
 </StrictMode>
)
