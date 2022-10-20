import React, {useEffect, useState } from 'react'
import { Table } from "./Table"
import Plotly from 'plotly.js-dist-min';
import '../App.css'


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

   const showStatistics = async () => {

    var xArray = journeys.map(journey => journey.CoveredDistance);
    var yArray = journeys.map(journey => journey.id);
    console.log("Xarray", xArray);
    console.log(yArray);
    // Define Data
    var data = [{
      x: xArray,
      y: yArray,
      mode:"markers",
      type:"histogram"
    }];

    // Define Layout
    var layout = {
      xaxis: {range: [0, 10000], title: "Covered distance, m"},
      yaxis: {range: [0, 20000], title: "Number of occurrences"},
      title: "Covered distances, histogram"
    };

    Plotly.newPlot('plotDistance',data, layout);

   }


   const deleteJourney = async () => {
   // find id with class "highlight"
   const row = document.getElementsByIdClassName('highlight');
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

    <div>
  
    <h1>Table of journeys </h1>   
      <Table rows={journeys} columns={columns} deleteClick={deleteJourney} showStats={showStatistics}/>
      <div id='plotDistance' className='plot'>This is my plot</div>  
    </div>
  )
}