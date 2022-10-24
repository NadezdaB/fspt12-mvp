# fspt12-mvp


## Description

This is a description of the Helsinki City Bike App. Its purpose is to encourage people to use bikes in the city instead of a private car or public transport. 
With the help of this app, users can:

* 1 View statistics on the bike journeys
* 2 See the bike stations in Helsinki and Espoo areas
* 3 Add own bike journey to the database
* 4 Find the closest bike stations within the given distance
* 5 For the selected bike station, see what are the most common hours when bikes are taken and returned. This will help users find the bike station with available bikes with higher probability.   


## Technologies Used

* [React](https://reactjs.org/)
* The JavaScript [Leaflet](https://leafletjs.com) mapping library
* NPM package [React Leaflet](https://react-leaflet.js.org/) lets you make maps in a React-y way
* [OpenCage](https://opencagedata.com/) for geocoding requests
* NPM package [opencage-api-client](https://www.npmjs.com/package/opencage-api-client)
* Luxon for working with datetime formats 
* Geolib package (npm install geolib), getDistance function to measure the distance between two coordinates in meters
* Bootstrap and Bootstrap React for styling
* Plotly for building plots 
* MySQL for working with databases, MySQL WorkBench to import data into the tables


## How to Install

1. Type `npm install` to install dependencies.
2. Obtain an API key from [OpenCage](https://opencagedata.com/) and store it like this in an `.env` file in the client folder:
```
REACT_APP_OCD_API_KEY=
```
## How to Run

1. Type `npm start` in the root directory to start back-end 
2. Type `npm start` in the client directory to start front-end
3. Type `mysql -u root -p`in the root directory, to connect to the MySQL database 


<hr>
<small>Last updated: 24 October 2022</small>