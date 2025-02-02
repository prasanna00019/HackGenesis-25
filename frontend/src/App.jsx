import React from 'react'
import { useAuthContext } from './context/Authcontext'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/Home';
import Signup from './pages/signup/Signup';
import Dashboard from './components/Dashboard';
import ArticlePage from './components/ArticlePage';
import Landing from './components/Landing';
import AngerTest from './components/AngerTest';
import AngerManagementTest from './components/AngerManagementTest';
import ADHD from './components/ADHD';
import ADHDTest from './components/ADHDTest';
import DepressionIntermediate from './components/DepressionIntermediate';
import DepressionTest from './components/DepressionTest';
import EmotionalStabilityIntermediate from './components/EmotionalStabilityIntermediate';
import EmotionalStabilityTest from './components/EmotionalStabilityTest';
import SocialAnxietyIntermediate from './components/SocialAnxietyIntermediate';
import SocialAnxietyTest from './components/SocialAnxietyTest';
const App = () => {
  const {Authuser}=useAuthContext();
  return (
    <div>
     <Routes>
      <Route path='/' element={<Navigate to='/home'/>} />
       <Route path='/home' element={Authuser?<Navigate to='/home/dashboard'/>: <Navigate to='/landing'/>} />
       <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/landing' element={<Landing/>}/>
        <Route path="/article/:id" element={<ArticlePage/>} />
        <Route path='/home/dashboard' element ={<Dashboard/>}/>
        <Route path='/home/dashboard/anger-mangement' element={<AngerTest/>}/>
        <Route path='/home/dashboard/anger-mangement/Test' element={<AngerManagementTest/>}/>
        <Route path='/home/dashboard/ADHD-mangement' element={<ADHD/>}/>
        <Route path='/home/dashboard/ADHD-mangement/Test' element={<ADHDTest/>}/>
        <Route path='/home/dashboard/Depression-mangement' element={<DepressionIntermediate/>}/>
        <Route path='/home/dashboard/Depression-mangement/Test' element={<DepressionTest/>}/>
        <Route path='/home/dashboard/emotional-mangement' element={<EmotionalStabilityIntermediate/>}/>
        <Route path='/home/dashboard/emotional-mangement/Test' element={<EmotionalStabilityTest/>}/>
        <Route path='/home/dashboard/social-mangement' element={<SocialAnxietyIntermediate/>}/>
        <Route path='/home/dashboard/social-mangement/Test' element={<SocialAnxietyTest/>}/>
     </Routes>
    </div>
  )
}
export default App
