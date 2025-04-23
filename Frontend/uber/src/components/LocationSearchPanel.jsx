import React, { useEffect, useState } from 'react';

const LocationSearchPanel = (props) => {
  const { suggestions, setPickup, setDestination,pickup,destination} = props; // Destructure props
  const [activeField, setActiveField] = useState('');
    useEffect(()=>{
        setActiveField('pickup');
    },[pickup])

    useEffect(()=>{
     
        setActiveField('destination');
    },[destination])
  
    const handleClick = (elem) => {
      if (activeField === 'pickup') {
        setPickup(elem.description); // Update pickup field
      }
      else if (activeField === 'destination') {
        setDestination(elem.description); // Update destination field
      }
      // props.setVehicle(true);
      // props.setPanel(false);
    };

  return (
    <div>
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
                      handleClick(elem);
             // Optionally update destination field
            //props.setVehicle(true);
            //props.setPanel(false);
          }}
          className='flex items-center my-4 justify-start'
        >
          <h2 className='bg-[#eee] h-10 flex items-center justify-center w-10 rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium'>{elem.description}</h4>
        </div>
      ))}
    </div>
  );
};
//react cannot display whole objects so we need to display properties of an object like we cannot display the elem object but we can display elem.discription

export default LocationSearchPanel
/*React State Update Flow
When you call setState (like setPickup("Delhi")):

React does NOT update the state immediately.

It schedules a re-render.

React waits for the entire function (or event handler) to finish.

Then it performs a single re-render using all the updated state.*/
// While a React state update is scheduled, any other function or event handler will run with the current (old) state until React re-renders.
// ✅ useEffect must be called at the top level of a component:
// This is a rule of hooks. You must always call hooks in the same order every time your component renders — and putting it inside a function breaks that.

