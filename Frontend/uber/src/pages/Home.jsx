import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Added axios import
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitForCaptain from '../components/WaitForCaptain';
import LookingForCaptain from '../components/LookingForCaptain';
import { SocketContextData } from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
const Home = () => {
  const navigate=useNavigate();
  const {socket,sendMessage,recieveMessage}=useContext(SocketContextData);
  const {user,setUser}=useContext(UserDataContext);
  //both will run don't simultaneously on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  }, [])
  
  useEffect(()=>{
    
    sendMessage("join",{
      userType:"user",
      userId:user._id
    })
  },[user])

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [fare,setFare]=useState({})
  const [suggestions, setSuggestions] = useState([]); // Added state for suggestions
  const [vehicle, setVehicle] = useState(false);
  const [panel, setPanel] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [vehicleType, setvehicleType] = useState();
  const [ride, setRide] = useState()

  const vehicleFoundRef = useRef(null);
  const confirmRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const bgRef = useRef(null);
  const vehicleRef = useRef(null);
  const waitingRef = useRef(null);
  useEffect(()=>{
    socket.on('ride-confirmed',(ride)=>{
      setWaiting(true);
      setVehicleFound(false);
      setRide(ride);
      console.log("hello");
    })
    return ()=>{
      socket.off('ride-confirmed',(ride)=>{
      setWaiting(true);
        setVehicleFound(false);
        setRide(ride);
        console.log("hello");
       
      })
    }
  },[])
  useEffect(() => {
    socket.on('ride-started', (ride) => {
      console.log("Ride started event received:", ride);
      setWaiting(false);
      navigate('/riding',{state:{ride:ride}}); // Ensure this is called
      setRide(ride);
    });

    return () => {
      socket.off('ride-started'); // Ensure proper cleanup
    };
  }, []);
  

  const submitHandler = (e) => {
    e.preventDefault();
  };
  async function findtrip()
  {
          setVehicle(true);
          setPanel(false);
          const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
            params:{
              pickup,
              destination
            },
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          setFare(response.data);

  }
  const createRide=async()=>{
    console.log('Token:', localStorage.getItem('token'));
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType
      },
      {
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    //console.log('Token:', localStorage.getItem('token'));
    //console.log(response.data);
  }
  

  const fetchSuggestions = async (query) => {
    try {
      if(query.length<3)
      {
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${query}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`/*You always need to manually pass the token in the headers when using fetch, axios, or any HTTP client — unless you're using a library or browser mechanism that handles it for you (like cookies with HttpOnly flags).*/
        }
      });
      setSuggestions(response.data); // Update suggestions with API response
    } catch (error) {
    console.error('Error fetching suggestions:', error);
    }
  };

  useGSAP(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: '60%',
        opacity: 1,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
      gsap.to(bgRef.current, {
        opacity: 0,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
      gsap.to(bgRef.current, {
        opacity: 1,
      });
    }
  }, [panel]);

  useGSAP(() => {
    if (vehicle) {
      gsap.to(vehicleRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehicleRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehicle]);

  useGSAP(() => {
    if (confirm) {
      gsap.to(confirmRef.current, {
        transform: 'translateY(0)',
        opacity:1
      });
    } else {
      gsap.to(confirmRef.current, {
        transform: 'translateY(100%)',
        opacity:0
      });
    }
  }, [confirm]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        
        opacity:1
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(200%)',
        
        opacity:1
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waiting) {
      gsap.to(waitingRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(waitingRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [waiting]);

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <img
        className='w-16 ml-2.5 absolute mt-1.5'
        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
      />

      <div className='h-screen w-screen' ref={bgRef}>
        <div className='h-3/5 w-full'>
        <LiveTracking/></div>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 relative'>
          <h5
            className='ml-[85%] absolute'
            ref={panelCloseRef}
            onClick={() => {
              setPanel(false);
            }}
          >
            <i className='ri-arrow-down-circle-line'></i>
          </h5>
          <h4 className='text-xl font-semibold ml-1 mb-3'>Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              className='bg-[#eee] px-12 py-2 mb-5 text-base rounded-lg w-full'
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                fetchSuggestions(e.target.value); // Fetch suggestions for pickup
                
               
              }}
              onClick={() => {
                setPanel(true);
              }}
              type='text'
              placeholder='Add a pick-up location'
            />
            <input
              className='bg-[#eee] px-12 py-2 mb-5 text-base rounded-lg w-full'
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchSuggestions(e.target.value); // Fetch suggestions for destination
              
              }}
              onClick={() => {
                setPanel(true);
                }}
                type='text'
                placeholder='Enter your destination'
              />
              <button
              className='bg-black text-white font-semibold py-2 px-4 rounded-lg w-full mt-3 shadow-md hover:bg-yellow-600 transition-all duration-300'
             onClick={findtrip} >
              Find Ride
              </button>
              </form>
            </div>
            <div ref={panelRef} className='p-5 mt-5 '>
              <LocationSearchPanel
              setPanel={setPanel}
              setVehicle={setVehicle}
              setPickup={setPickup} // Pass setPickup to update pickup field
            setDestination={setDestination} // Pass setDestination to update destination field
            suggestions={suggestions} // Pass suggestions to LocationSearchPanel
            pickup={pickup}
            destination={destination}
          />
        </div>
      </div>
      <VehiclePanel setvehicleType={setvehicleType} fare={fare} setConfirm={setConfirm} setVehicle={setVehicle} vehicleRef={vehicleRef} />
      <div
        className='fixed z-10 translate-y-full w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6'
        ref={confirmRef}
      >
        <ConfirmRide
          setWaiting={setWaiting}
          setConfirm={setConfirm}
          confirmRef={confirmRef}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        
        />
      </div>
      <div
        className='fixed z-10  w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6'
        ref={waitingRef}
      >
        <WaitForCaptain setWaiting={setWaiting} waitingRef={waitingRef} ride={ride} />
      </div>
      <div
        className='fixed z-10 translate-y-full w-full flex flex-col gap-2 bg-white bottom-0 px-3 py-6'
        ref={vehicleFoundRef}
      >
        <LookingForCaptain 
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
      </div>
    </div>
  );
};


/*What is Two-Way Binding?
It means the UI and the state stay in sync both ways:


Direction	Description
UI ➡️ State	The user types something → triggers onChange → updates state (setPickup)
State ➡️ UI	The input displays what's in the state → value={pickup} binds input to state
So any change in one side immediately reflects on the other.
*/
export default Home;