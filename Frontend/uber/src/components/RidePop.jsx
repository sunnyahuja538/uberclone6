import React from 'react'

const RidePop = (props) => {
  return (
    <div>
         <h5 className='ml-[85%] absolute' onClick={()=>{
            props.setRidePopUpPanel(false);
              }}>
                <i className="ri-arrow-down-circle-line"></i>
                </h5>  
                <h3 className='text-2xl font-semibold mb-5'>A Ride For You!</h3>
                <div className='flex items-center rounded-xl p-4 bg-yellow-400 justify-between mt-4'>
                    <div className='flex items-center gap-3'>
                        <img className='h-10 w-10 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
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
              <div className='flex w-full mt-5 px-2 justify-between'>
              <button className=' bg-gray-200 text-gray-700 font-semibold px-4 p-2 rounded-lg' onClick={()=>{
                props.setRidePopUpPanel(false);
              }}>Ignore</button>
              <button className=' bg-green-500 font-semibold p-2 px-4 rounded-lg' onClick={()=>{
                props.setConfirmRidePopUpPanel(true);
              }}>Accept</button>
              
              </div>
              
    </div>
  )
}

export default RidePop