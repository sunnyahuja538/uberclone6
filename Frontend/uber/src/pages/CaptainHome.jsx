import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom'
import RidePop from '../components/RidePop';
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  const [ridePopUpPanel,setRidePopUpPanel]=useState(true);
  const [confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);
  const ridePopUpPanelRef=useRef(null);{/*ref is passed to a html element not to a component*/}
  const confirmRidePopUpPanelRef=useRef(null);
  const navigate=useNavigate();
  useGSAP(()=>{
    if(ridePopUpPanel)
    {
    gsap.to(ridePopUpPanelRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(ridePopUpPanelRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[ridePopUpPanel]);
  useGSAP(()=>{
    if(confirmRidePopUpPanel)
    {
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[confirmRidePopUpPanel]);  
  return (
    <div className='h-screen relative'>
       <div className='fixed flex items-center justify-between w-screen'>{/*Yes — the child will appear above the parent by default,
      unless the parent or sibling has a higher z-index. */}
              <img className='h-8 w-16 ml-5 mt-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
       <div className='h-10 w-10 mr-6 bg-white mt-5 flex items-center justify-center rounded-full' onClick={()=>{
        navigate('/captainLogin')
      }}>
      <i className="font-medium ri-logout-box-r-line"></i>
      </div>
      </div>
        <div className='h-3/5'>
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
        </div>
        <div className='h-2/5 p-6 flex flex-col gap-8'>
          <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png"/>
              <h4>Shashank</h4>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>Rs.295.20</h4>
              <p className='text-xl font-medium text-gray-600'>Earned</p>
              </div>
              </div>
              <div className='flex justify-center p-3 bg-gray-100 rounded-xl gap-10 text-center'>
              <div className='text-center'>
              <i className="text-3xl font-extralight mb-2 ri-timer-line"></i>
              <h5 className='text-sm font-medium'>10.2</h5>
              <p className='text-xs text-gray-600'>Hours online</p>
              </div>
              <div className='text-center'>
              <i className="text-3xl font-extralight mb-2 ri-speed-up-line"></i>
              <h5 className='text-sm font-medium'>10.2</h5>
              <p className='text-xs text-gray-600'>Hours online</p>
              </div>
              <div className='text-center'>
              <i className="text-3xl font-extralight mb-2 ri-booklet-line"></i>
              <h5 className='text-sm font-medium'>10.2</h5>
              <p className='text-xs text-gray-600'>Hours online</p>
              </div>
              </div>
          </div>
          <div className='fixed w-full flex flex-col gap-2 translate-y-full bg-white bottom-0 px-3 py-6' ref={ridePopUpPanelRef} >
            <RidePop setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
              </div>
              <div className='fixed h-screen w-full flex flex-col gap-2 translate-y-full bg-white bottom-0 px-3 py-6' ref={confirmRidePopUpPanelRef} >
            <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
              </div>          
          

        
        </div>
    
  )
}

export default CaptainHome