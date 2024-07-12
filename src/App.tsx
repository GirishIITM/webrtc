import { useState,useEffect } from 'react'
import './App.css'
import {Route,Routes} from "react-router-dom"
import Home from "pages/Home.tsx"

function App() {

  useEffect(() => {
    
    }, [])

   
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes> 
   </div>
  )
}

export default App
