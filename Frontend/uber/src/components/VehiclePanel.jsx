import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <div className='fixed z-10 translate-y-full w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6' ref={props.vehicleRef}>
              <h5 className='ml-[85%] absolute' onClick={()=>{
                props.setVehicle(false);
              }}>
                <i className="ri-arrow-down-circle-line"></i>
                </h5>
                <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
                <div className='flex p-3 border-2 active:border-black rounded-lg w-full items-center justify-between' onClick={()=>{
                  props.setConfirm(true);
                }}>
                  <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"/>
                  <div className=' ml-2 w-1/2'>
                    <h4 className='font-semibold text-base'>
                      UberGo <span><i className="ri-user-3-line"></i>4</span>
                    </h4>
                    <h5 className='font-medium text-sm mb-1'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                  </div>
                  <h2 className='text-xl font-semibold'>Rs.193.20</h2>
                </div>
                <div className='flex p-3 border-2 active:border-black  rounded-lg w-full items-center justify-between' onClick={()=>{
                  props.setConfirm(true);
                }}>
                  <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"/>
                  <div className=' ml-2 w-1/2'>
                    <h4 className='font-semibold text-base'>
                      UberMoto <span><i className="ri-user-3-line"></i>1</span>
                    </h4>
                    <h5 className='font-medium text-sm mb-1'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                  </div>
                  <h2 className='text-xl font-semibold'>Rs.193.20</h2>
                </div>
                <div className='flex p-3 border-2 active:border-black  rounded-lg w-full items-center justify-between' onClick={()=>{
                  props.setConfirm(true);
                }}>
                  <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"/>
                  <div className=' ml-2 w-1/2'>
                    <h4 className='font-semibold text-base'>
                      UberAuto <span><i className="ri-user-3-line"></i>2</span>
                    </h4>
                    <h5 className='font-medium text-sm mb-1'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                  </div>
                  <h2 className='text-xl font-semibold'>Rs.193.20</h2>
                </div>
                </div>
    </div>
  )
}

export default VehiclePanel