import React from 'react'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './Components/Context/ThemeContext'
import { ThemeToggle } from './Components/ThemeToggle/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
        <ThemeToggle />
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App