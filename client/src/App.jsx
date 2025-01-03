import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import Privateroute from './components/Privateroute'
import Createlisting from './pages/Createlisting'

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<Privateroute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/createlisting' element={<Createlisting />} />
        </Route>
      </Routes>

    </>
  )
}
