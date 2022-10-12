import React, {useEffect, useState }  from 'react'
import { Table } from "./Table"

export default function Station() {

  const [station, setStations] = useState([]);

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

const columns = [
  { accessor: 'id', label: 'ID' },
  { accessor: 'Name', label: 'Name' },
  { accessor: 'Address', label: 'Address' },
  { accessor: 'station ID', label: 'Station ID' },
  { accessor: 'x_coord', label: 'X coordinate of the station'},
  { accessor: 'y_coord', label: 'Y coordinate of the station'}
]


  return (
    <div>Table of the bike stations
 
      <Table rows={station} columns={columns} />

    </div>
  )
}
