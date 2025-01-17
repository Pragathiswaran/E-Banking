import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NavBar from './components/NavBar'

const App = () => {
  return (
   <>
    <NavBar/>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
   </>
  )
}

export default App