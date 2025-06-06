import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from '../src/context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketContext from './context/SocketContext.jsx'
createRoot(document.getElementById('root')).render(
  
    <SocketContext>
    <CaptainContext>
    <UserContext>
      <BrowserRouter>
      
      <App/>{/* <App/> app is the children of UserContext */}
      
      </BrowserRouter>
      </UserContext>
      </CaptainContext>
      </SocketContext>
   
  
)
