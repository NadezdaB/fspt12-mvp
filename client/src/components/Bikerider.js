import React from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import "./Bikerider.css";

export default function Bikerider(props) {
  // When map is clicked on, make that the center, and call props.revGeocodeCb(latLng)
 // When map is clicked on, make that the center, and call props.revGeocodeCb(latLng)
 function MoveMapOnClick() {
  let map = useMapEvent('click', (event) => {
      // Center map on click
      map.flyTo(event.latlng, map.getZoom());  // setView() looks much less cool ;-)
      // Make array of two numbers representing lat/lng
      let latLng = [Number(event.latlng.lat.toFixed(4)), Number(event.latlng.lng.toFixed(4))];
      // Call callback
      props.revGeocodeCb(latLng);
  });

  return null;
}

return (
  <MapContainer
      className="ClickableMap" 
      center={[51.505, -0.09]} 
      zoom={13} 
      scrollWheelZoom={false}
      style={{ height: '1400px', width: '70%' }}
  >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Add a click handler to the map */}
      <MoveMapOnClick />
  </MapContainer>
);

}
