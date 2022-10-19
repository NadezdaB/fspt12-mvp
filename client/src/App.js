import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Journey from "./components/Journey";
import Station from "./components/Station";
import AddJourney from "./components/AddJourney";
import Bikerider from './components/Bikerider';
import NotFoundPage from "./components/Notfoundpage";

function App() {
  return (
    <div className="App">
      <h1 className='text-center'> Welcome to the Helsinki City Bike App!</h1>

      <div className='row'>
        <div className='container col-4 statistics'>
          <p>See statistics </p>
          
          <Link to="/journeys">Journey</Link>
          <br></br>
          <Link to="/stations">Bike Stations</Link>   
        </div>

        <div className='container col-4 addjourney'>
          <Link to="/addjourney">Add your bike journey</Link>
        </div>

        <div className='container col-4 ride'>
        <Link to="/ride">Try a bike ride</Link>
        </div>
      </div>        
        


     <Routes>
      <Route path="/addjourney" element={<AddJourney />} />
      <Route path="/journeys" element={<Journey />}/>
      <Route path="/stations" element={<Station />}/>
      <Route path="/ride" element={<Bikerider />}/>
      <Route path="/*" element={<NotFoundPage />} />
     </Routes>

    </div>
  );
}

export default App;
