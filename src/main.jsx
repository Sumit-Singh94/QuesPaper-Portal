import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Homepage } from './Components/index.js'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'


const router=createBrowserRouter([
  {
    path:'/',
    element:<Homepage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
