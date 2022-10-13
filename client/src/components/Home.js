import React, {useState, useEffect} from 'react'

export default function Home() {


    // DEPARTURE station variables and states
const [depStationID, setDepStationID] = useState();
const [depStationName, setDepStationName] = useState("");
const [depTime, setDepTime] = useState();

   // RETURN station variables and states
const [retStationID, setRetStationID] = useState();
const [retStationName, setRetStationName] = useState("");
const [retTime, setRetTime] = useState();

   // JOURNEY variables and states

const [distance, setDistance] = useState();
const [duration, setDuration] = useState();


// DEPARTURE station related functions
function handleIDdep (e) {
    setDepStationID(e.target.value);
}

function handleNameDep (e) {
    setDepStationName(e.target.value);
}

function handleTimeDep (e) {
    setDepTime(e.target.value);
}
// RETURN station related functions
function handleIDret (e) {
    setRetStationID(e.target.value);
}

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

// const columns = [
//     { accessor: 'id', label: 'ID' },
//     { accessor: 'departureTime', label: 'Depature time' },
//     { accessor: 'returnTime', label: 'Return time' },
//     { accessor: 'departureStationID', label: 'Departure station ID' },
//     { accessor: 'returnStationID', label: 'Return station ID'},
//     { accessor: 'CoveredDistance(m)', label: 'Covered distance(m)'},
//     { accessor: 'Duration(sec)', label: 'Duration(sec)'}
//   ]

var depDate = new Date(depTime);
var retDate = new Date(retTime);
  const journey = {
    'departureTime': depDate,
    'returnTime' : retDate,
    'departureStationID': parseInt(depStationID),
    'returnStationID': parseInt(retStationID),
    'CoveredDistance': parseInt(distance),
    'Duration': parseInt(duration)
}

const addJourney = () => {
    fetch("/journeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //body: JSON.stringify({ input: journey }) // pass here what backend is expecting
       body: JSON.stringify(journey)
    })
    //   // Continue fetch request here
    //   .then(res => res.json())
    //   .then(json => setJourney(json));
  };

function handleSubmit (e) {
    e.preventDefault();
    addJourney();

}


  return (
    <div>
        <h1>Welcome to the Helsinki City Bike App!</h1>

        <div className="row">
           <div className='col 3'>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Departure information</p>

                <label>Departure station ID
                 <input onChange={(e)=>handleIDdep(e)} value={depStationID}/>
                </label>

                <label>Departure station name
                    <input onChange={(e) => handleNameDep(e)} value={depStationName}/>
                </label> 

                <label>Departure time
                 <input onChange={(e)=>handleTimeDep(e)} value={depTime}/>
                </label>

            </div>

            <div className='form-group'>
            
                <p>Return information</p>
                <label>Return station ID
                 <input onChange={(e)=>handleIDret(e)} value={retStationID}/>
                </label>

                <label>Return station name
                    <input onChange={(e) => handleNameRet(e)} value={retStationName}/>
                </label> 
                
                <label>Return time
                 <input onChange={(e)=>handleTimeRet(e)} value={retTime}/>
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