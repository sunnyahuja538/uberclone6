import React from 'react'

const WaitForCaptain = (props) => {
  return (
    <div>
      <h5 className='ml-[90%] mt-0 absolute' onClick={() => {
        props.setWaiting(false);
      }}>
        <i className="ri-arrow-down-circle-line"></i>
      </h5>
      <div className='flex items-center justify-between p-5'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png" />
        <div className='text-right'>
          <h2 className='text-lg font-medium mt-2 capitalize'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-sm font-semibold mt-2 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm mt-2'>Maruti Suzuki Alto</p>
          <div className='flex items-center  mt-2 ml-5'>
            <i className="ri-lock-line text-sm"></i>
            <div >
              <h3 className='text-sm font-medium inline'>OTP:</h3>
              <p className='text-sm -mt-1 text-gray-600 inline ml-1'>{props.ride?.otp}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-between gap-2 flex-col items-center'>
        <div className='w-full flex mt-5 flex-col justify-between gap-5'>
          <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-base -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
              <p className='text-base -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-base -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitForCaptain