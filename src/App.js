
import Home from './Home';
import Battleship from './Battleship';
import Map from './Map';
import './index.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
    return (
      
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/battleship_game" element={<Home />} />
            <Route path="/battleship" element={<Battleship />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </Router>
      </>
      
    );
}
export default App;
