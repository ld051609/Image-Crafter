import React from 'react'
import Homepage from './pages/Homepage'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import GenerateImage from './components/GenerateImage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/imageGeneration' element={<GenerateImage/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App