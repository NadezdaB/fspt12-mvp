import React, {useState, useEffect} from 'react';
import "./Bikerider.css";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import ClickableMap from './ClickableMap';
import { revgeocode } from '../helpers/geo-opencage';
import { breakAddr } from '../helpers/utils';
import { getDistance } from 'geolib';

export default function Bikerider(props) {

  const [stations, setStations] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [filterStations, setFilterStations] = useState([]);
  const [address, setAddress] = useState('');

    // Called when user clicks on the map
    async function latLngToAddress(latLng) {
        let myresponse = await revgeocode(latLng);
        console.log("This is latLngtoAddress when clicked on the map", address);
        if (myresponse.ok) {
            // Display formatted address returned by OpenCage as well as lat/lng
            let latlngstr = 'Latitude/Longitude: ' + latLng.join('/');
            setAddress(myresponse.data.formatted_address + ', ' + latlngstr);
        }
    }

   useEffect(() => {
    getStations();
   }, []);

   // this function calculates the distance between two given coordinates in meters

   stations.map(station => {
    
   station.distances = 
   
   getDistance(
      { latitude: station.y_coord, longitude: station.x_coord },
      { latitude: 60.192059, longitude: 24.945831 }
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
      <div className="Bikerider">
            <div className="row">
                <div className="col">
                    <h3 className="mb-5">Click on the Map!</h3>
                    {
                        address && (
                            <>
                                <h4>You clicked here:</h4>
                                <p>{ breakAddr(address) }</p>
                            </>
                        )
                    }
                </div>

                <div className="col">
                    {props.home && <ClickableMap revGeocodeCb={latLngToAddress} home={props.home} zoom={6} />}
                </div>
            </div>
        </div>

      <h1>Find the closest bike stations nearby</h1>
      <label> Within how many meters would you like to display the stations?
        <input value={bounds} onChange={(e) => handleBounds(e)} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Show me the closest bike stations</button>
      </label>
      
      <MapContainer 
       className="ClickableMap" 
       center={[60.192059, 24.945831]} 
       zoom={13} 
       scrollWheelZoom={true}
       >

    {/* center={[60.192059, 24.945831]} zoom={13} scrollWheelZoom={true}> */}
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
    );
}


