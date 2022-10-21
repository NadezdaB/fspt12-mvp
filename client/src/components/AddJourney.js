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
        
        <h2>Add Your bike journey!</h2>

        
            <form onSubmit={handleSubmit}>

            <div class="row">
            <div class="col-sm-6">
            <div class="card">
            <div class="card-header">
            Departure information    
            </div>

            <div class="card-body">


            <div className='form-group'>
                            

                <label className='form-label'>Departure station name
                    <select className = "form-select" onChange={(e) => handleNameDep(e)} value={depStationName}>
                    
                    {stations.map((station) => (                        
                        <option value={station.Name}>{station.Name}</option>
                    ))}       

                    </select>                    
                </label> 

                <label className='form-label'>Departure time
                 <input className = "form-control" type="datetime-local" onChange={(e)=>handleTimeDep(e)} value={depTime}/>  
                </label>
            </div>

            </div>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col-sm-6">
            <div class="card">
            <div class="card-header">
            Return information    
            </div>

            <div class="card-body">
                           
               <div className='form-group'>           
                
                <label className='form-label'>Return station name
                    <select className = "form-select" onChange={(e) => handleNameRet(e)} value={retStationName}>
                    
                    {stations.map((station) => (                        
                        <option value={station.Name}>{station.Name}</option>
                    ))}     

                    </select>                    
                </label>          


                
                <label className='form-label'>Return time
                 <input className = "form-control" type="datetime-local" onChange={(e)=>handleTimeRet(e)} value={retTime}/>
                </label>     

              </div>

              </div>
            </div>
            </div>
            </div>


            <div class="row">
            <div class="col-sm-6">
            <div class="card">
            <div class="card-header">
            Journey information    
            </div>
            <div class="card-body">

            <div className='form-group'>

                
                <label className='form-label'>Covered distance (m) 
                    <input className = "form-control" onChange={(e) => handleDist(e)} value={distance}/>
                </label>
                <label className='form-label'>Duration (sec) 
                    <input className = "form-control" onChange={(e) => handleDuration(e)} value={duration}/>
                </label>
            </div>
            </div>
            </div>
            </div>
            </div>
            
            <button className="btn btn-primary center" type="submit">Add your bike journey to the database</button>

        </form>           
            
            
     </div>  
       

   
  )
}
