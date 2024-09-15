// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import Home from './Home';
import Battleship from './Battleship';
import Map from './Map';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/battleship" element={<Battleship />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
