import React, {useEffect, useState } from 'react';
import { Table } from "./Table";
import Plotly from 'plotly.js-dist-min';
import '../App.css';
const { DateTime } = require("luxon");



export default function Journey() {

  const [journeys, setJourneys] = useState([]);
  
   useEffect(() => {
    getJourneys();
   }, []);

   const getJourneys = () => {
   
    fetch('/journeys')
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setJourneys(json);
    })      
  
   .catch(error => {
    console.log(error);
    
   });
   }   

   const showStatistics = async() => {
    
    var xArray = journeys.map(journey => journey.CoveredDistance/1000);
    var yArray = journeys.map(journey => journey.Duration/60);
    // console.log("Xarray", xArray);
    // console.log("Yarray",yArray);
    // Define Data
    var data = [];
    data = [{
      x: xArray,
      y: yArray,
      mode:"markers",
      type:"scatter"
    }];

    // Define Layout
    var layout = {
      xaxis: {range: [0, Math.max(...xArray)*1.2], title: "Covered distance, km"},
      yaxis: {range: [0, Math.max(...yArray)*1.2], title: "Duration, min"},
      title: "Covered distances"
    };

    Plotly.newPlot('plotDistance',data, layout);

   }

   const showStationStats = async () => {
    const row = document.getElementsByClassName('highlight');
   // the id of the row to be displayed
    let rowID = row[0].getAttribute('id');
    console.log(rowID);
    let journey = journeys.filter(e => e.id == `${rowID}`);
    console.log(journey[0].departureStationName);

    let filterDeparture = journeys.filter(e => e.departureStationName === journey[0].departureStationName);
    let filterReturn = journeys.filter(e => e.returnStationName === journey[0].returnStationName);
    let depHours = filterDeparture.map(journey => parseInt(DateTime.fromISO(journey.departureTime).toFormat('HH'))-3);
    let retHours = filterDeparture.map(journey => parseInt(DateTime.fromISO(journey.returnTime).toFormat('HH'))-3);

    let depHoursRetStation = filterReturn.map(journey => parseInt(DateTime.fromISO(journey.departureTime).toFormat('HH'))-3);
    let retHoursRetStation = filterReturn.map(journey => parseInt(DateTime.fromISO(journey.returnTime).toFormat('HH'))-3);  
  
   
    /// histogram with dropdown menus 

    let dataToPlot = [depHours, retHours,depHoursRetStation, retHoursRetStation];
    let nameForPlot = [`Departure hours for departure station ${journey[0].departureStationName}`,
    ...`Return hours for departure station ${journey[0].returnStationName}`,
    ...`Departure hours for return station ${journey[0].returnStationName}`,
    ...`Return hours for return station ${journey[0].returnStationName}`]
    console.log(nameForPlot);

    function makeTrace(i) {
      return {
          y: dataToPlot[i], 
          type: "histogram",     
          visible: i === 0,
          name: nameForPlot[i],
          xaxis: {title: "Hours"}

      };
    }

    Plotly.newPlot('myDiv', [0, 1, 2, 3].map(makeTrace), {
      updatemenus: [{
          y: 0.8,
          yanchor: 'top',
          buttons: [{
              method: 'restyle',
              args: ['line.color', 'red'],
              label: `return station ${journey[0].returnStationName}`
          }, {
              method: 'restyle',
              args: ['line.color', 'blue'],
              label: `departure station ${journey[0].departureStationName}`
          }]
      }, {
          y: 1,
          yanchor: 'top',
          buttons: [{
              method: 'restyle',
              args: ['visible', [true, false, false, false]],
              label: 'return hours'
          }, {
              method: 'restyle',
              args: ['visible', [false, true, false, false]],
              label: 'departure hours'
          }]
      }],
    });
      }



   const deleteJourney = async () => {
   // find id with class "highlight"
   const row = document.getElementsByClassName('highlight');
   console.log("This is id of the row to be deleted", row[0].getAttribute('id'));
   let rowID = row[0].getAttribute('id');
   // delete a journey from the database
  const response = await fetch(`/journeys/${rowID}`, {
    method: "DELETE"    
   });   
     const journey = await response.json();
     setJourneys(journey); 
     alert("Journey deleted successfully!");   
   } 

   console.log("This is a journey object: ", journeys[0]);

   const columns = [
    { accessor: 'id', label: 'ID' },
    { accessor: 'departureTime', label: 'Depature time'},
    { accessor: 'returnTime', label: 'Return time' },
    { accessor: 'departureStationName', label: 'Departure station name' },
    { accessor: 'returnStationName', label: 'Return station name'},
    { accessor: 'CoveredDistance', label: 'Covered distance(m)'},
    { accessor: 'Duration', label: 'Duration(sec)'}
  ]

  return (

    <div style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60")` ,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh'
    
    }}>

    <h2  className='text-center'>Bike journey statistics</h2>     
        
        <Table rows={journeys} columns={columns} deleteClick={deleteJourney}/>  

        <button onClick={showStatistics}>Show statistics</button>
        <button onClick={showStationStats}>Show statistics on the selected stations</button> 
      
        <h2 id='plotDistance' className='plot'>Statistics on covered distance and duration</h2> 
        <br/> 
        <h2 id='myDiv'className='plot'>Statistics on selected departure and return stations</h2>      


    </div>
  )
}