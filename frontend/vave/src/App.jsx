import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home.jsx'
import Login from './components/login.jsx'
import Secode from './components/seccode.jsx'
import Final from './components/third.jsx'
import ProtectedRoute from './components/protected.jsx'
import Profile from './components/profile.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path='/' element = {<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/login/addcode' element={<ProtectedRoute><Secode /></ProtectedRoute>}></Route>
      <Route path='/login/final'  element={<ProtectedRoute><Final /></ProtectedRoute>}></Route>
    </Routes>
    </Router>
  )
}

export default App
