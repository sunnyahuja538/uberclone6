import React, { useState } from 'react'
import { createContext } from 'react';
export const UserDataContext=createContext(null);

const UserContext = ({children}) => {
    const [user, setUser] = useState(() => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
});
    
  return ( 
    <div>
        <UserDataContext.Provider value={{user, setUser}}>
        {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext