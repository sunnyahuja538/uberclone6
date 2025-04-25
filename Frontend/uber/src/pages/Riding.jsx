import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { SocketContextData } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';


const Riding = () => {
  const [newRide, setNewRide] = useState();
const location=useLocation();
useEffect(()=>{
  console.log("Location state:", location.state);
  setNewRide(location?.state?.ride);
},[])
console.log(newRide);
  const navigate=useNavigate();
  const [ride, setRide] = useState()
  const {socket}=useContext(SocketContextData);
  useEffect(() => {
      socket.on('ride-ended', (ride) => {
        console.log("Ride started event received:", ride);
        //setWaiting(false);
        navigate('/home'); // Ensure this is called
        setRide(ride);
      });
  
      return () => {
        socket.off('ride-ended'); // Ensure proper cleanup
      };
    }, []);
    
  return (
    <div className='h-screen relative'>
      <div className='fixed h-10 w-10 bg-green-100 flex items-center justify-center rounded-full' onClick={()=>{
        navigate('/home')
      }}>
      <i className="font-medium ri-home-smile-line"></i>
      </div>
        <div className='h-[50%]'>
          <LiveTracking/>
        </div>
        <div className='h-[60%] p-4'>
        <div className='flex items-center justify-between gap-3'>
             <img className='h-16'  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"/>
             <div className='text-right'>
             <h2 className='text-lg font-medium'>{newRide?.user?.fullname?.firstname}</h2>
             <h4 className='text-xl font-semibold -mt-1 -mb-1'>{newRide?.captain?.vehicle?.plate}</h4>
             <p className='text-sm'>Maruti Suzuki Alto</p>
             </div>

             </div>
            <div className='flex justify-between gap-2 flex-col items-center'>
           <div className='w-full flex mt-5 flex-col justify-between gap-5'>
           
           <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
           <i className   ="ri-currency-line"></i>
           <div>
             <h3 className='text-lg font-medium'>{newRide?.fare}</h3>
             <p className='text-base -mt-1 text-gray-600'>Cash</p>
           </div>
           </div>
           <div className='flex items-center gap-5 p-3'>
           <i className="text-lg ri-map-pin-2-fill"></i>
           <div>
             <h3 className='text-lg font-medium'>562/11-A</h3>
             <p className='text-base -mt-1 text-gray-600'>{newRide?.pickup}</p>
           </div>
           </div>
           </div>
           </div>
        <button className='mt-1 w-full bg-green-600 font-semibold p-2 rounded-lg'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding