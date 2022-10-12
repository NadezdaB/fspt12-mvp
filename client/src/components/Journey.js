import React, {useEffect, useState } from 'react'

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
      setJourneys(json)
   })
   .catch(error => {
    console.log(error);
  });
}
    



  return (
    <div>Journey</div>
  )
}
