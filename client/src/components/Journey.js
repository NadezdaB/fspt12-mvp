import React, {useEffect, useState } from 'react'
import { Table } from "./Table"

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

   const deleteJourney = async () => {
   // find id with class "highlight"
   const row = document.getElementsByClassName('highlight');
   console.log("This is the row to be deleted", row);
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
    { accessor: 'departureTime', label: 'Depature time' },
    { accessor: 'returnTime', label: 'Return time' },
    { accessor: 'departureStationID', label: 'Departure station ID' },
    { accessor: 'returnStationID', label: 'Return station ID'},
    { accessor: 'CoveredDistance', label: 'Covered distance(m)'},
    { accessor: 'Duration', label: 'Duration(sec)'}
  ]

  return (

    <div>
  
    <h1>Table of journeys </h1>   
      <Table rows={journeys} columns={columns} deleteClick={deleteJourney}/>  
    </div>
  )
}