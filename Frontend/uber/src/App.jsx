import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
const App = () => {

  return (
    <div>
      <Routes>
     <Route path='/' element={<Start/>}/>
     <Route path='/login' element={<UserLogin/>}/>
     <Route path='/SignUp' element={<UserSignUp/>}/>
     <Route path='/captainSignUp' element={<CaptainSignup/>}/>
     <Route path='/captainLogin' element={<CaptainLogin/>}/>
     <Route path='/home' element={ /*<UserProtectedWrapper>*/<Home/>/*</UserProtectedWrapper>*/}/>
     <Route path='/logout' element={/*<UserProtectedWrapper>*/<UserLogout/>/*</UserProtectedWrapper>*/}/>
     <Route path='/captain-home' element={/*<CaptainProtectedWrapper>*/<CaptainHome/>/*</CaptainProtectedWrapper>*/}/>
     <Route path='/riding' element={<Riding/>}/>
     <Route path='/captain-riding' element={<CaptainRiding/>}/>  

      
     </Routes>
    </div>
  )
}

export default App