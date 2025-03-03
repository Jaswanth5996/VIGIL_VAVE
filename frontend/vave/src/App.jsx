import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home.jsx'
import Login from './components/login.jsx'
import Secode from './components/seccode.jsx'
import Final from './components/third.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path='/' element = {<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/login/addcode' element={<Secode />}></Route>
      <Route path='/login/final' element={<Final />}></Route>
    </Routes>
    </Router>
  )
}

export default App
