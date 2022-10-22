import './App.css';
import { Routes, Route} from "react-router-dom";
import Journey from "./components/Journey";
import Station from "./components/Station";
import AddJourney from "./components/AddJourney";
import Bikerider from './components/Bikerider';
import Home from './components/Home';
import NotFoundPage from "./components/Notfoundpage";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <div className="App">

      <Navbar bg="success" expand="lg">
      <Container>        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Show statistics" id="basic-nav-dropdown">
              <NavDropdown.Item href="journeys">Bike journeys</NavDropdown.Item>
              <NavDropdown.Item href="stations">
                Bike stations
              </NavDropdown.Item>              
            </NavDropdown>
            <Nav.Link href="addjourney">Add your bike journey</Nav.Link>
            <Nav.Link href="ride">Take a bike ride</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>     
        


     <Routes>
      <Route path="/" element={<Home />} />
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
