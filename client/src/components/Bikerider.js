import React, {useState, useEffect} from 'react';
import "./Bikerider.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet';
import { getDistance } from 'geolib';

export default function Bikerider() {

  const [stations, setStations] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [filterStations, setFilterStations] = useState([]);
  const [address, setAddress] = useState([]);

  function MoveMapOnClick() {
    let map = useMapEvent('click', (event) => {
        // Center map on click
        map.flyTo(event.latlng, map.getZoom());  // setView() looks much less cool ;-)
        // Make array of two numbers representing lat/lng
        let latLng = [Number(event.latlng.lat.toFixed(4)), Number(event.latlng.lng.toFixed(4))];
        setAddress(latLng);
    });    
}


console.log("LatLon of the clicked point are ", address[0], address[1]);
  

    // // Called when user clicks on the map
    // async function latLngToAddress(latLng) {
    //     let myresponse = await revgeocode(latLng);
    //     console.log("This is latLngtoAddress when clicked on the map", address);
    //     if (myresponse.ok) {
    //         // Display formatted address returned by OpenCage as well as lat/lng
    //         let latlngstr = 'Latitude/Longitude: ' + latLng.join('/');
    //         setAddress(myresponse.data.formatted_address + ', ' + latlngstr);
    //     }
    // }

   useEffect(() => {
    getStations();
   }, []);

   // this function calculates the distance between two given coordinates in meters

   stations.map(station => {
    
   station.distances = 
   
   getDistance(
      { latitude: station.y_coord, longitude: station.x_coord },
      { latitude: address[0], longitude: address[1] }

      //{ latitude: 60.192059, longitude: 24.945831 }
  );
  return station;
});
  
   function handleBounds(e) {
    setBounds(e.target.value);
   }

   function handleSubmit(e) {
    e.preventDefault();

   let filtStations = stations.filter(station => station.distances<=bounds);
   
   setFilterStations(filtStations);
   }
   
   
   const getStations = () => {
   
    fetch('/stations')
    .then(res => res.json())
    .then(json => {
      setStations(json)
   })
   .catch(error => {
    console.log(error);
  }); 
   }

    return (
      <>
            <div className="row">
                <div className="col">
                    <h3 className="mb-5">Click on the Map!</h3>                    
                </div>                
            </div>
      

      <h1>Find the closest bike stations nearby</h1>
      <label> Within how many meters would you like to display the stations?
        <input value={bounds} onChange={(e) => handleBounds(e)} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Show me the closest bike stations</button>
      </label>
      
      <MapContainer 
       className="Bikerider" 
       center={[60.192059, 24.945831]} 
       zoom={13} 
       scrollWheelZoom={true}       
       >
        <MoveMapOnClick />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filterStations.map((station) => (
            <Marker
              key={station.id}
              position={[station.y_coord, station.x_coord]}>
              <Popup>
                {station.Name} <br />
                Capacity {station.capacity} bikes
              </Popup>
            </Marker>
          ))}
           
      </MapContainer>      
 
    </> 
    ) 
  }