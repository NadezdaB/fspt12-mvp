import React, {useEffect, useState } from 'react'
import { Table } from "./Table"

export default function Journey() {

  const [journey, setJourneys] = useState([]);

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

   console.log("This is a journey object: ", journey[0]);
   const columns = [
    { accessor: 'id', label: 'ID' },
    { accessor: 'departureTime', label: 'Depature time' },
    { accessor: 'returnTime', label: 'Return time' },
    { accessor: 'departureStationID', label: 'Departure station ID' },
    { accessor: 'returnStationID', label: 'Return station ID'},
    { accessor: 'CoveredDistance(m)', label: 'Covered distance(m)'},
    { accessor: 'Duration(sec)', label: 'Duration(sec)'}
  ]

  return (
    <div>Journey
  
    <h1>Table of journeys </h1>   
      <Table rows={journey} columns={columns} />  
      
    </div>
  )
}
