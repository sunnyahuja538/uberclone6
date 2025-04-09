import React from 'react'

const LocationSearchPanel = (props) => {
  //console.log(props);
  const location=[
    "24B, Near Kapoor's Cafe",
    "24A, Near Kapoor's Cafe",
    "24B, Near Kapoor's Cafe"
  ]
  return (
    <div>
      {location.map((elem,index)=>{
              return (<div key={index} onClick={()=>{props.setVehicle(true);
                props.setPanel(false);
              }} className='flex items-center my-4 justify-start'>
              <h2 className='bg-[#eee] h-10 flex items-center justify-center w-10 rounded-full'>
            <i className="ri-map-pin-fill"></i></h2>
              <h4 className='font-medium'>{elem}</h4>
            </div>)
      
      })}
      
    </div>
  )
}

export default LocationSearchPanel