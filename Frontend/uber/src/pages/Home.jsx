import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitForCaptain from '../components/WaitForCaptain';
import LookingForCaptain from '../components/LookingForCaptain';
const Home = () => {
  const [pickup,setPickup]=useState('');
  const [destination,setDestination]=useState('');
  const [vehicle,setVehicle]=useState(false);
  const submitHandler=(e)=>{
    e.preventDefault();
  }
  const [panel, setPanel] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [waiting,setWaiting]=useState(false);
  const [vehicleFound,setVehicleFound]=useState(false);
  const vehicleFoundRef=useRef(null);
  const confirmRef=useRef(null);
  const panelRef=useRef(null);
  const panelCloseRef=useRef(null);
  const bgRef=useRef(null);
  const vehicleRef=useRef(null);
  const waitingRef=useRef(null);
  useGSAP(function () {
    if (panel) {
        gsap.to(panelRef.current, {
            height: '60%',
        
            opacity:1
        })
        gsap.to(panelCloseRef.current, {
            opacity: 1
        })
        gsap.to(bgRef.current, {
        
          opacity:0
        })
    } else {
        gsap.to(panelRef.current, {
            height: '0%',
           
            opacity:0
        })
        gsap.to(panelCloseRef.current, {
            opacity: 0
        })
        gsap.to(bgRef.current, {
        
          opacity:1
        })
    }
}, [ panel ])
useGSAP(()=>{
  if(vehicle)
  {
  gsap.to(vehicleRef.current,{
    transform:'translateY(0)'
  })
}
else{
  gsap.to(vehicleRef.current,{
    transform:'translateY(100%)'
  })
}
},[vehicle])
useGSAP(()=>{
  if(confirm)
  {
  gsap.to(confirmRef.current,{
    transform:'translateY(0)'
  })
}
else{
  gsap.to(confirmRef.current,{
    transform:'translateY(100%)'
  })
}
},[confirm])
useGSAP(()=>{
  if(vehicleFound)
  {
  gsap.to(vehicleFoundRef.current,{
    transform:'translateY(0)'
  })
}
else{
  gsap.to(vehicleFoundRef.current,{
    transform:'translateY(100%)'
  })
}
},[vehicleFound])
useGSAP(()=>{
  if(waiting)
  {
  gsap.to(waitingRef.current,{
    transform:'translateY(0)'
  })
}
else{
  gsap.to(waitingRef.current,{
    transform:'translateY(100%)'
  })
}
},[waiting])

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
        <img className='w-16 ml-2.5 absolute mt-1.5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

        <div className='h-screen w-screen' ref={bgRef}>
          <img className='h-3/5 w-full' src='https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg'/>
              </div>
              <div className='flex flex-col justify-end h-screen absolute top-0 w-full'> {/* absolute will help to lift the div on z axis relative to parent div*/}
                <div className='h-[30%] p-5 relative'>
                  <h5 className='ml-[85%] absolute' ref={panelCloseRef} onClick={()=>{
                    setPanel(false);
                  }}>
                <i className="ri-arrow-down-circle-line"></i>
                </h5>
                <h4 className='text-xl font-semibold ml-1 mb-3   '>Find a trip</h4>
                <form onSubmit={(e)=>{
                  submitHandler(e);
                }}>
                  <input className='bg-[#eee] px-12 py-2 mb-5 text-base rounded-lg w-full' value={pickup} onChange={(e)=>{
                    setPickup(e.target.value);
                  }} onClick={()=>{
                    setPanel(true);
                  }} type="text" placeholder='Add a pick-up location' />
                  <input className='bg-[#eee] px-12 py-2 mb-5 text-base rounded-lg w-full' value={destination} onChange={(e)=>{
                    setDestination(e.target.value); 
                  }} onClick={()=>{
                    setPanel(true);
                  }} type="text" placeholder='Enter your destination' />

                </form>
                </div>
                <div ref={panelRef} className='p-5 '>
                  <LocationSearchPanel setPanel={setPanel} setVehicle={setVehicle}/>
                </div>
              </div>
              <VehiclePanel setConfirm={setConfirm} setVehicle={setVehicle} vehicleRef={vehicleRef}/>
              <div className='fixed z-10 translate-y-full w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6' ref={confirmRef}>
              <ConfirmRide setWaiting={setWaiting} setConfirm={setConfirm} confirmRef={confirmRef} setVehicleFound={setVehicleFound}/>
              </div>
              <div className='fixed z-10  w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6' ref={waitingRef}>
                <WaitForCaptain setWaiting={setWaiting} waitingRef={waitingRef}/>
              </div>
              <div className='fixed z-10 translate-y-full w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6' ref={vehicleFoundRef}>
                <LookingForCaptain setVehicleFound={setVehicleFound}/>
              </div>
                
              
    </div>
  )
}

export default Home