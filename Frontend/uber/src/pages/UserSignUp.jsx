import React, { useContext, useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext'

const UserSignUp = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [userData,setUserData]=useState({});
    //it prevents the form to reload on submission which is it default behaviour


    //we cannot write useEffect inside a function (except inside a React component or another hook).
    /*React does not update state immediately; it schedules updates and re-renders the component.

Logging the state right after setState will not reflect the latest value.

Use useEffect to log the state after it has been updated.





useEffect runs after the component has updated (i.e., after the re-render caused by setUserData). This ensures that we log the updated state.*/
    useEffect(()=>{
      console.log(userData);
    },[userData]);
    const navigate=useNavigate();
    const {user,setUser}=useContext(UserDataContext);
    const submitHandler=async (e)=>{
      e.preventDefault();
      const newUser={
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
          email,
          password
      }
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser );
      if(response.status===201 )
      {
        const data=await response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate('/home');
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10 mt-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <h3 className='text-base font-medium mb-2'>What's your name</h3>
          <div className='flex gap-2 mb-5'>
          <input required value={firstName} onChange={(e)=>{
            setFirstName(e.target.value);
          }} className='bg-[#eeeeee] rounded w-1/2 px-4 py-2 pb-2.5  text-lg placeholder:text-sm' type="text" placeholder='Firstname'>
          </input>
          <input required value={lastName} onChange={(e)=>{
            setLastName(e.target.value);
          }} className='bg-[#eeeeee] rounded w-1/2  px-4 py-2 pb-2.5  text-lg placeholder:text-sm' type="text" placeholder='Lastname'>
          </input>
          </div>





          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <input required value={email} onChange={(e)=>{
            setEmail(e.target.value);
          }} className='bg-[#eeeeee] rounded mb-5 px-4 py-2 pb-2.5 w-full text-lg placeholder:text-sm' type="email" placeholder='enter your email'>
          </input>
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input required value={password} onChange={(e)=>{
            setPassword(e.target.value);
          }} className='bg-[#eeeeee] rounded mb-5 px-4 py-2 pb-2.5  w-full text-lg placeholder:text-sm' type="password" placeholder='password'></input>
          <button className='bg-[#111] text-white font-base mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
          <p className='text-center'>Already have an account?<Link to='/login' className='text-blue-300'>Click here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding with an Uber action (like creating an account or requesting a ride), you consent to Uber collecting and using your data, as outlined in their privacy notice, and to receiving text messages for business operations. </p>
      </div>
    </div>
    )
}

export default UserSignUp