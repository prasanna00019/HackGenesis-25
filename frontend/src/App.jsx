import React from 'react'
import { useAuthContext } from './context/Authcontext'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/Home';
import Signup from './pages/signup/Signup';
import Dashboard from './components/Dashboard';
import ArticlePage from './components/ArticlePage';
import Landing from './components/Landing';
const App = () => {
  const {Authuser}=useAuthContext();
  return (
    <div>
     <Routes>
      <Route path='/' element={<Navigate to='/home'/>} />
       <Route path='/home' element={Authuser?<Home/>: <Navigate to='/login'/>} />
       <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/landing' element={<Landing/>}/>
        <Route path="/article/:id" element={<ArticlePage/>} />
        <Route path='/home/dashboard' element ={<Dashboard/>}/>
     </Routes>
    </div>
  )
}
export default App
