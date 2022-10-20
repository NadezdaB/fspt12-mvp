import React, {useState, useEffect} from 'react'

export default function AddJourney() {

    // DEPARTURE station variables and states
const [depStationName, setDepStationName] = useState("");
const [depTime, setDepTime] = useState();

   // RETURN station variables and states
const [retStationName, setRetStationName] = useState("");
const [retTime, setRetTime] = useState();

   // JOURNEY variables and states

const [distance, setDistance] = useState();
const [duration, setDuration] = useState();

// LOAD Station information from station DB table

const [stations, setStations] = useState([]);
useEffect( () => getStations(), []);

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


function handleNameDep (e) {
    setDepStationName(e.target.value);
}

function handleTimeDep (e) {
    setDepTime(e.target.value);
}
// RETURN station related functions

function handleNameRet (e) {
    setRetStationName(e.target.value);
}

function handleTimeRet (e) {
    setRetTime(e.target.value);
}

// JOURNEY related functions

function handleDist (e) {
    setDistance(e.target.value);
}

function handleDuration (e) {
    setDuration(e.target.value);
}

  const journey = {
    'departureTime': depTime,
    'returnTime' : retTime,
    'departureStationName' : depStationName,
    'returnStationName' : retStationName,
    'CoveredDistance': parseInt(distance),
    'Duration': parseInt(duration)    
}

const addJourney = () => {
    // add journey data to the journey table
    fetch("/journeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //body: JSON.stringify({ input: journey }) // pass here what backend is expecting
       body: JSON.stringify(journey)
    })
  // Continue fetch request here   
   .then(res => res.json())

   alert("Journey added successfully!");

}
   

function handleSubmit (e) {
    e.preventDefault();
    addJourney();

}


  return (
    <div>
        <h1>Add Your bike journey!</h1>

        <div className="row">
           <div className='col 3'>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Departure information</p>                

                <label>Departure station name
                    <select name="station name" onChange={(e) => handleNameDep(e)} value={depStationName}>
                    
                    {stations.map((station) => (                        
                        <option value={station.Name}>{station.Name}</option>
                    ))}       

                    </select>                    
                </label> 

                <label>Departure time
                 <input type="datetime-local" onChange={(e)=>handleTimeDep(e)} value={depTime}/>  
                </label>

            </div>

            <div className='form-group'>
            
                <p>Return information</p>                

                <label>Return station name
                    <select name="station name" onChange={(e) => handleNameRet(e)} value={retStationName}>
                    
                    {stations.map((station) => (                        
                        <option value={station.Name}>{station.Name}</option>
                    ))}     

                    </select>                    
                </label>          


                
                <label>Return time
                 <input type="datetime-local" onChange={(e)=>handleTimeRet(e)} value={retTime}/>
                </label>     

            </div>

            <div className='form-group'>

                <p>Journey information</p>
                <label>Covered distance (m) 
                    <input onChange={(e) => handleDist(e)} value={distance}/>
                </label>
                <label>Duration (sec) 
                    <input onChange={(e) => handleDuration(e)} value={duration}/>
                </label>
            </div>
            <button type="submit">Add your bike journey to the database</button>
            </form>
            
            
            
            </div>  

        </div>

    </div>
  )
}
