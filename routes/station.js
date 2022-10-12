var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET stations listing. */
router.get('/', function(req, res, next) {
  //res.send({message: 'Welcome to the stations statistics!'});
  db("SELECT * FROM bike_stations;")
  .then(results => {
    res.send(results.data);
  })
  .catch(err => res.status(500).send(err));
});



module.exports = router;
