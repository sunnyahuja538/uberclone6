import React from 'react'

const LookingForCaptain = (props) => {
  return (
    <div>
    <h5 className='ml-[85%] absolute' onClick={()=>{
             props.setVehicleFound(false);
           }}>
             <i className="ri-arrow-down-circle-line"></i>
             </h5>  
             <h3 className='text-2xl font-semibold mb-5'>Looking for a captain</h3>
             <div className='flex justify-between gap-2 flex-col items-center'>
           <img className='h-20'  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"/>
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
           
 </div>
  )
}

export default LookingForCaptain