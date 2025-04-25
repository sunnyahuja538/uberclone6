import React, { useEffect, useState } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const LiveTracking = ({ userLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(userLocation || { lat: 0, lng: 0 });

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error('Error fetching position:', error),
        { enableHighAccuracy: true }
      );
    };

    updateLocation(); // Initial location update
    const intervalId = setInterval(updateLocation, 10000); // Update every 10 seconds

  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={currentLocation}
        zoom={15}
      >
        <Marker position={currentLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;