import React, {useState, useEffect} from 'react';
import "./Bikerider.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet';
import { getDistance } from 'geolib';

export default function Bikerider() {

  const [stations, setStations] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [filterStations, setFilterStations] = useState([]);
  const [address, setAddress] = useState([60.192059, 24.945831]);

  useEffect(() => {
    getStations();
   }, []); 
   

   const getStations = () => {
    fetch('/stations')
    .then(res => res.json())
    .then(json => {
      console.log(json);

      setStations(json)
   })
   .catch(error => {
    console.log(error);
  }); 
   }
   console.log(stations);


  function MoveMapOnClick() {
    let map = useMapEvent('click', (event) => {
        // Center map on click
        map.flyTo(event.latlng, map.getZoom());  // 
        // Make array of two numbers representing lat/lng
        let latLng = [Number(event.latlng.lat.toFixed(4)), Number(event.latlng.lng.toFixed(4))];
        setAddress(latLng);
    });    
  }

//console.log("LatLon of the clicked point are ", address[0], address[1]);     


   // this function calculates the distance between two given coordinates in meters

   stations.map(station => {
    console.log("calculating the distances");
    
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
   

    return (
      <>   
      <div>   
        {/* <div style={{ 
        backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/587/656/862/digital-art-simple-background-minimalism-bicycle-wallpaper-preview.jpg")` ,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh'
      
      }}> */}

      <h2>Click on the map where you are and find the closest bike stations nearby</h2>
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
            <Marker
                  key="clicked"
                  position={[address[0], address[1]]}>
                  <Popup>
                    You clicked here!                     
                  </Popup>
            </Marker>
        

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
      </div>
    </> 
    ) 
  }