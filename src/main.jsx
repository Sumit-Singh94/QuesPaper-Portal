import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AboutUs, HomeScreen } from "./Components/index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CourseContextProvider from "./Components/Context/ContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Semesterpage } from "./Components/HomePage/Semesterpage.jsx";
import { Paperspage } from "./Components/index.js";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // this is an index route or default route under app
        element: <HomeScreen />,
      },
      {
        path: "/course/:coursecode",
        element: <Semesterpage />
      },
      {
        path: "/course/:coursecode/semester/:semester",
        element: <Paperspage />
      },
      {
        path: "/AboutUs",
        element: <AboutUs />
      }

    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CourseContextProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </CourseContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
