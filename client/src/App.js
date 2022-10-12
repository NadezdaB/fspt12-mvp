import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Journey from "./components/Journey";
import Station from "./components/Station";


function App() {
  return (
    <div className="App">
        <Link to="/journey">Journey</Link>
        <Link to="/stations">Bike Stations</Link>   
     <Routes>
      <Route path="/journey" element={<Journey />}/>
      <Route path="/stations" element={<Station />}/>
     </Routes>

    </div>
  );
}

export default App;
