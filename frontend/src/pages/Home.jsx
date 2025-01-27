import React from 'react'
import useLogout from './useLogout'

const Home = () => {
  const {logout}=useLogout();
  const handlelogout=()=>{
    logout();
  }
  return (
    <div>
      WELCOME TO THE MOOD TRACKER APP . AUTH COMPLETED !!!
      <button onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Home
