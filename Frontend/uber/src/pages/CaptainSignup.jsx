import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    //const [captain,setCaptain]=useState({});
    const [vehicleColor, setVehicleColor] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const {captain,setCaptain}=useContext(CaptainDataContext);
  const navigate=useNavigate();
      //it prevents the form to reload on submission which is it default behaviour
  
  
      //we cannot write useEffect inside a function (except inside a React component or another hook).
      /*React does not update state immediately; it schedules updates and re-renders the component.
  
  Logging the state right after setState will not reflect the latest value.
  
  Use useEffect to log the state after it has been updated.
  
  
  
  
  
  useEffect runs after the component has updated (i.e., after the re-render caused by setUserData). This ensures that we log the updated state.*/
      const submitHandler=async (e)=>{
        e.preventDefault();
          const captainData={fullname:{
            firstname:firstName,
            lastname:lastName
          },
            email,
            password,
            vehicle:{
              color:vehicleColor,
              plate:numberPlate,
              capacity:capacity,
              vehicleType:vehicleType
            }
          }
          const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData);
          if(response.status===201)
          {
            const data=response.data;
            setCaptain(data.captain);
            localStorage.setItem('token',data.token);
            navigate('/captain-home');//navigate will unmount the component so further code will not be executed.
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
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-base font-medium mb-2'>What's your name</h3>
          <div className='flex gap-2 mb-5'>
            <input required value={firstName} onChange={(e) => {
              setFirstName(e.target.value);
            }} className='bg-[#eeeeee] rounded w-1/2 px-4 py-2 pb-2.5  text-lg placeholder:text-sm' type="text" placeholder='Firstname'>
            </input>
            <input required value={lastName} onChange={(e) => {
              setLastName(e.target.value);
            }} className='bg-[#eeeeee] rounded w-1/2  px-4 py-2 pb-2.5  text-lg placeholder:text-sm' type="text" placeholder='Lastname'>
            </input>
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <input required value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} className='bg-[#eeeeee] rounded mb-5 px-4 py-2 pb-2.5 w-full text-lg placeholder:text-sm' type="email" placeholder='enter your email'>
          </input>
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input required value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} className='bg-[#eeeeee] rounded mb-5 px-4 py-2 pb-2.5  w-full text-lg placeholder:text-sm' type="password" placeholder='password'></input>
          <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
          <div className='grid grid-cols-2 gap-4 mb-5'>
            <input required value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 pb-2.5 w-full text-lg placeholder:text-sm' type="text" placeholder='Vehicle Color' />
            <input required value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 pb-2.5 w-full text-lg placeholder:text-sm' type="text" placeholder='Number Plate' />
            <input required value={capacity} onChange={(e) => setCapacity(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 pb-2.5 w-full text-lg placeholder:text-sm' type="number" placeholder='Capacity' />
            <select required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className='bg-[#eeeeee] rounded px-4 py-2 pb-2.5 w-full text-lg placeholder:text-sm'>
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">auto</option>
            </select>
          </div>
          <button className='bg-[#111] text-white font-base mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding with an Uber action (like creating an account or requesting a ride), you consent to Uber collecting and using your data, as outlined in their privacy notice, and to receiving text messages for business operations. </p>
      </div>
    </div>
  )
}

export default CaptainSignup