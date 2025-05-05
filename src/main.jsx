import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Coursepage, HomeScreen } from "./Components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "course/:coursecode",
    element: <Coursepage />
   }
  ]
 }
])

createRoot(document.getElementById("root")).render(
 <StrictMode>
  <RouterProvider router={router} />
 </StrictMode>
)
