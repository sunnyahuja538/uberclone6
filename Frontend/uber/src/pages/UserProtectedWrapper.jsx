import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({children}) => {
    
    const token=localStorage.getItem('token');
    
    const navigate=useNavigate();
   useEffect(()=>{
    navigate('/login');
   },[token])
  return (
    <>{children}</>
  )
}

export default UserProtectedWrapper