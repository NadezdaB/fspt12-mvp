var express = require('express');
var router = express.Router();
const db = require("../model/helper");

async function getJourneys() {

  try {
    let journeys = await db("SELECT * from journey_data LIMIT 20;");
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

module.exports = router;
