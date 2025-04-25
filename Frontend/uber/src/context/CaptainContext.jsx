import React, { createContext, useState } from 'react'
//import { createContext } from 'react'
//import { UserDataContext } from './UserContext';
export const CaptainDataContext=createContext();
const CaptainContext = ({children}) => {
  const [captain,setCaptain]=useState(()=>{
    const stored = localStorage.getItem('captain');
  return stored ? JSON.parse(stored) : null;
});
  return (
    <>
    <CaptainDataContext.Provider value={{captain,setCaptain}}>
    {children}
    </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContext