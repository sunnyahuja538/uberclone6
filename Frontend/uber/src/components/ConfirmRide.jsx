import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
       <h5 className='ml-[85%] absolute' onClick={()=>{
                props.setConfirm(false);
              }}>
                <i className="ri-arrow-down-circle-line"></i>
                </h5>  
                <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
                <div className='flex justify-between gap-2 flex-col items-center'>
              <img className='h-20'  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"/>
              <div className='w-full flex mt-5 flex-col justify-between gap-5'>
              <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base -mt-1 text-gray-600'>{props.pickup}</p>
              </div>
              </div>
              <div className='flex items-center gap-5 p-3'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base -mt-1 text-gray-600'>{props.destination}</p>
              </div>
              </div>
              <div className='flex items-center border-b-2 border-gray-200 gap-5 p-3'>
              <i className   ="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>Rs.{props.fare[props.vehicleType]}</h3>
                <p className='text-base -mt-1 text-gray-600'>Cash</p>
              </div>
              </div>
              </div>
              </div>
              <button className='w-full bg-green-600 font-semibold p-2 rounded-lg' onClick={()=>{
                props.setVehicleFound(true);
                props.setConfirm(false)
                props.createRide();
              }}>Confirm</button>
              
    </div>
  )
}

export default ConfirmRide
// ✅ Using dot notation (.)
// js
// Copy
// Edit
// let obj = { name: "Alex" };
// console.log(obj.name); // ✅ works
// 💡 Rules:
// Property must be a valid identifier

// Cannot use variables

// No special characters, spaces, or starting with a number

// js
// Copy
// Edit
// let obj = { "first name": "Alex", 123: "value" };
// // console.log(obj.first name); ❌ SyntaxError
// ✅ Using bracket notation ([])
// js
// Copy
// Edit
// let obj = { name: "Alex", "first name": "Alex", 123: "num" };

// console.log(obj["name"]); // ✅ works
// console.log(obj["first name"]); // ✅ works
// console.log(obj[123]); // ✅ works
// 💡 You can:
// Access properties with spaces

// Use variables as keys

// Handle dynamic property names

// js
// Copy
// Edit
// let key = "name";
// console.log(obj[key]); // ✅ dynamic access
// 🧠 Summary:

// Feature	Dot Notation (obj.key)	Bracket Notation (obj["key"])
// Works with valid names	✅	✅
// Works with variables	❌	✅
// Works with spaces/special chars	❌	✅
// Dynamic keys	❌	✅
