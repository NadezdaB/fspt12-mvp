import React, {useEffect, useState } from 'react'

export default function Journey() {

  const [journey, setJourneys] = useState([])

   useEffect(() => {
    fetch('/journey')
    setUsers(data)
   })
  return (
    <div>Journey</div>
  )
}
