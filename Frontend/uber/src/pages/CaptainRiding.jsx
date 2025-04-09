import React from 'react'
import { Link } from 'react-router-dom'


const CaptainRiding = () => {
  return (
    <div className='h-screen'>
        <div className='fixed flex items-center justify-between w-screen overflow-hidden'>{/*Yes — the child will appear above the parent by default,
      unless the parent or sibling has a higher z-index. */}
              <img className='h-8 w-16 ml-5 mt-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
       <div className='h-10 w-10 mr-6 bg-white mt-5 flex items-center justify-center rounded-full' onClick={()=>{
        navigate('/captainLogin')
      }}>
      <i className="font-medium ri-logout-box-r-line"></i>
      </div>
      </div>
        <div className='h-[80%]'>
            <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
        </div>
        <div className='h-[20%] w-screen relative bg-yellow-400 flex flex-col justify-evenly items-center'>
        <h5 className='ml-[85%] absolute top-0' onClick={()=>{
            
              }}>
                <i className="ri-arrow-down-circle-line"></i>
                </h5>  
        <h4 className='text-lg font-semibold text-center'>4 Kms Away</h4>
        <div className='w-full h-full  flex justify-evenly items-center'>
            <Link className='w-[30%] bg-red-500 text-sm text-center mt-2 font-semibold p-2 rounded-lg'>End Ride</Link>
            <Link className='w-[30%] bg-green-500 text-sm text-center mt-2 font-semibold p-2 rounded-lg'>Complete Ride</Link>
        </div>
          </div>
    </div>
  )
}

export default CaptainRiding