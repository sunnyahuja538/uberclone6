import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ConfirmRidePopUp = (props) => {
    const navigate=useNavigate();
    const [otp, setOtp] = useState('')
    const submitHandler=(e)=>{
      e.preventDefault();
    }
  return (
    <div className=''>
        <h5 className='ml-[85%] absolute' onClick={()=>{
           props.setConfirmRidePopUpPanel(false);
              }}>
                <i className="ri-arrow-down-circle-line"></i>
                </h5>  
                <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
                <div className='flex items-center rounded-xl p-4 bg-yellow-400 justify-between mt-4'>
                    <div className='flex items-center gap-3'>
                        <img className='h-10 w-10 rounded-full' src=""/>
                        <h2 className='text-lg font-medium'>Shashank</h2>
                    </div>
                    <h5 className='text-lg font-semibold'>2.2Kms</h5>
                </div>
                <div className='flex justify-between gap-2 flex-col items-center'>
              <div className='w-full flex mt-5 flex-col justify-between gap-5'>
              <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base -mt-1 text-gray-600'>Kankariya Talab,Ahmedabad</p>
              </div>
              </div>
              <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
              <i className   ="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>Rs.193.20</h3>
                <p className='text-base -mt-1 text-gray-600'>Cash</p>
              </div>
              </div>
              <div className='flex items-center gap-5 p-3'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base -mt-1 text-gray-600'>Kankariya Talab,Ahmedabad</p>
              </div>
              </div>
              </div>
              </div>
              <form onSubmit={(e)=>{
                submitHandler(e);
              }} className='mt-6'>
                <input value={otp} onChange={(e)=>{
                  setOtp(e.target.value)
                }
                } type="text"placeholder='Enter OTP' className='bg-[#eee] px-12 py-2 mb-5 text-base rounded-lg w-full' />
              <button className='w-full bg-green-400 font-mono  mt-2 font-semibold p-2 rounded-lg' onClick={()=>{
                navigate('/captain-riding');
              }}>Confirm</button>
              <button className='w-full bg-red-500 mt-5 text-white font-semibold p-2 rounded-lg' onClick={()=>{
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}>Cancel</button>
              </form>
              
    </div>
  )
}

export default ConfirmRidePopUp