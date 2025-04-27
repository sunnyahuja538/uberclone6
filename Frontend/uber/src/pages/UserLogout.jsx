import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const UserLogout = () => {
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,{
        headers:{
            Authorisation:`Bearer ${token}`
        } 
    }
).then((response)=>{
    if(response.status===200)
    {
        localStorage.removeItem('token');
            navigate('/login');
    }
})
    
    
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout
// Sure! Here's a more concise version including the `navigate` part:

// ### **1. `useEffect`**:
// - **Purpose**: Handles side effects (e.g., data fetching) after rendering.
// - **Dependencies**: Use an empty array `[]` to run once, or pass state/props to rerun when they change.

// ### **2. `navigate` in `useEffect`**:
// - **Correct Use**: Use `useEffect` to navigate after async operations (like logout). Avoid navigating directly in the main function to prevent unwanted re-renders.
  
// ### **3. Mistakes**:
// - **Navigate Without `useEffect`**: Calling `navigate` without `useEffect` causes issues because it triggers re-renders and navigation loops.
// - **Async in Component**: Components cannot be async; async logic should be inside `useEffect`.

// ### **4. Do’s & Don’ts**:
// - **Do’s**:
//   - Use `useEffect` for async tasks and navigation.
//   - Use `useState` for state tracking and re-renders.
//   - Call `navigate` after async tasks finish.

// - **Don’ts**:
//   - Don’t use `navigate` directly without async handling.
//   - Don’t make the component function async.
//   - Don’t use non-state variables (e.g., `localStorage`) in `useEffect` dependencies.

// This should cover all the essential points in a more concise format!