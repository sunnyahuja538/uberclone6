import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';

const CaptainProtectedWrapper = ({children}) => {
    
    const token=localStorage.getItem('token');
    
    const navigate=useNavigate();
   useEffect(()=>{
    navigate('/captainLogin');
   },[token])
  return (
    <>{children}</>
  )
}

export default CaptainProtectedWrapper