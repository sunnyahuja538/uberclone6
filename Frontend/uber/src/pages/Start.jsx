import React from 'react'
import {Link} from 'react-router-dom'
import UserLogin from './UserLogin'
const Start = () => {
  return (
    <div>
    <div className='bg-cover bg-center bg-[url(../public/assets/uber.webp)] h-screen w-full bg-gray-400 flex justify-between flex-col'>
        <img className='w-16 ml-5 mt-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"/>
        <div className='py-5 px-5 bg-white md:text-center'>
        <h2 className='text-3xl font-bold text-center'>Get Started with Uber</h2>
        <Link to='/login' className=' flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link> {/*It is by default inline*/}
        </div>
    </div>
    </div>
  )
}

export default Start