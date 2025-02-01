import React from 'react'
import { useAuthContext } from './context/Authcontext'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/Home';
import Signup from './pages/signup/Signup';
import Dashboard from './components/Dashboard';
const App = () => {
  const {Authuser}=useAuthContext();
  return (
    <div className='text-center text-4xl text-blue-500 font-bold'>
     <Routes>
      <Route path='/' element={<Navigate to='/home'/>} />
       <Route path='/home' element={Authuser?<Home/>: <Navigate to='/login'/>} />
       <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home/dashboard' element ={<Dashboard/>}/>
     </Routes>
    </div>
  )
}
export default App
