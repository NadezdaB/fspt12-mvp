var express = require('express');
var router = express.Router();
const db = require("../model/helper");

async function getJourneys() {

  try {
    let journeys = await db("SELECT * from journey_data;");
    return journeys.data;
  }
  catch (err) {
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
  let {departureStationID,returnStationID,CoveredDistance,Duration} = req.body;
  console.log(typeof(Duration));
  await db(`INSERT INTO journey_data (departureStationID, returnStationID, CoveredDistance, Duration) VALUES (${departureStationID}, ${returnStationID}, ${CoveredDistance}, ${Duration});`);
  
  res.send("Journey added successfully!");
 })  

 router.delete('/', async(req,res) => {
  console.log(req.body);

 })

module.exports = router;
