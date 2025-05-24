import React from 'react'
import { courseContext } from '../Context'
import { useState } from 'react';


 function CourseContextProvider({children}) {

     const [listDocs, setlistDocs] = useState();
    
  return (
  
    <courseContext.Provider  value={{listDocs,setlistDocs}}>
        {children}

    </courseContext.Provider>
  )
}

export default CourseContextProvider;