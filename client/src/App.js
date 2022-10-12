import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Journey from "./components/Journey";
import Station from "./components/Station";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/journeys">Journey</Link>
        <br></br>
        <Link to="/stations">Bike Stations</Link>   
     <Routes>
      <Route path="" element={<Home />} />
      <Route path="/journeys" element={<Journey />}/>
      <Route path="/stations" element={<Station />}/>
     </Routes>

    </div>
  );
}

export default App;
