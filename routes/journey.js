var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const { DateTime } = require("luxon");

async function getJourneys() {

  try {
    let journeys = await db("SELECT * from journey_data;");
    
    // journeys.data.map(journey => {
    //   //console.log(journey.departureTime.toLocaleString(DateTime.DATETIME_FULL));
    //   journey.departureTime = journey.departureTime.toLocaleString(DateTime.DATETIME_FULL); 
    //   journey.returnTime = journey.returnTime.toLocaleString(DateTime.DATETIME_FULL);
    //   return journey;
    // })
   
    return journeys.data;
  }  catch (err) {
    return err;
  }
};


/* GET journeys listed */
router.get('/', async (req, res) => {
  //res.send({message: 'Welcome to the journey statistics!'});
  const journeys = await getJourneys();
  res.send(journeys);
  });

 // POST a new journey submitted by the user 
 router.post('/', async(req,res) => {
  console.log(req.body);
  let {departureStationID, returnStationID, CoveredDistance, Duration, departureTime, returnTime} = req.body;
  console.log(typeof(Duration));
  console.log(typeof(departureTime));
  await db(`INSERT INTO journey_data (departureTime, returnTime, departureStationID, returnStationID, CoveredDistance, Duration) VALUES ("${departureTime}","${returnTime}", ${departureStationID}, ${returnStationID}, ${CoveredDistance}, ${Duration});`);
  
  res.send({message: "Journey added successfully!"});
 })  

 router.delete('/:journeyID', async(req,res) => {
  console.log(req.params);
  console.log("Journey to be deleted is: ", req.params.journeyID);
  await db(`DELETE FROM journey_data WHERE id = ${req.params.journeyID};`);
  const journeys = await getJourneys();
  res.send(journeys);
 })

module.exports = router;
