import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';


const CaptainProtectedWrapper = ({ children }) => {
  // Use state to track the token
  const [token, setToken] = useState(localStorage.getItem('token'));//No, the initialization of a state variable itself does not cause a re-render. Here’s how it works:
  const navigate = useNavigate();//Yes, initialization of the state variable happens during the mounting phase of the component lifecycle.

  // Effect to redirect when token is invalid or not found
  useEffect(() => {
    if (!token) {
      navigate('/captainLogin'); // Redirect if no token found
    }
    // Add more checks for token validity if needed
    // For example, checking for token expiration here
  }, [token]);  // Effect re-runs when token changes

  return <>{children}</>;
};
export default CaptainProtectedWrapper;