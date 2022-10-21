import React, {useEffect, useState }  from 'react'
import { Table } from "./Table"

export default function Station() {

  const [stations, setStations] = useState([]);

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
    <div>
      <h2 className='text-center'>Bike stations</h2> 
    
    <div className="container text-center">
      <div className="row">

        <div className="col">
          <Table rows={stations} columns={columns}/>
        </div>

       <div className="col">
        <h2 id='plotDistance' className='plot'>This is my plot</h2> 
       </div>

       </div>
    </div>

    </div>
  )
}
