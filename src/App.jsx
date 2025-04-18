import React from 'react'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'



function App() {
  return (
   <>
      <Header/>
      <Outlet/>
      <Footer/>

   </>
  )
}

export default App