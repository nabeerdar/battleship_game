import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Map.css';
import shipImage from './images/Sunny_Go.jpg'; // Add a ship image to your project
import enemyShipImage from './images/Marine_ship.png'; // Add an enemy ship image to your project

function Map() {
  const navigate = useNavigate();
  const [visitedIslands, setVisitedIslands] = useState([]);
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 });
  const [enemyShipPosition, setEnemyShipPosition] = useState({ x: 4, y: 4 });

  useEffect(() => {
    // Add event listener for arrow key navigation
    window.addEventListener('keydown', handleKeyDown);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shipPosition]);

  const handleBackToGame = () => {
    navigate('/battleship'); // Navigate back to the Battleship component
  };

  const handleKeyDown = (event) => {
    // Calculate new position based on arrow key presses
    let newPosition = { ...shipPosition };
    switch (event.key) {
      case 'ArrowUp':
        newPosition = { ...newPosition, y: Math.max(shipPosition.y - 1, 0) };
        break;
      case 'ArrowDown':
        newPosition = { ...newPosition, y: Math.min(shipPosition.y + 1, 8) }; // Assuming 9 rows
        break;
      case 'ArrowLeft':
        newPosition = { ...newPosition, x: Math.max(shipPosition.x - 1, 0) };
        break;
      case 'ArrowRight':
        newPosition = { ...newPosition, x: Math.min(shipPosition.x + 1, 8) }; // Assuming 9 columns
        break;
      default:
        break;
    }

    // Check if the new position is an island
    if (isIsland(newPosition.x, newPosition.y)) {
      visitIsland(newPosition);
    } else if (isEnemyShip(newPosition.x, newPosition.y)) {
      navigate('/battleship'); // Navigate to the battleship component when encountering an enemy ship
    } else {
      setShipPosition(newPosition);
    }
  };

  const isIsland = (x, y) => {
    // Define island positions
    const islands = [
      { x: 2, y: 2 },
      { x: 6, y: 6 },
    ];

    return islands.some(island => island.x === x && island.y === y);
  };

  const isEnemyShip = (x, y) => {
    return enemyShipPosition.x === x && enemyShipPosition.y === y;
  };

  const visitIsland = (position) => {
    const islandKey = `${position.x}-${position.y}`;
    if (!visitedIslands.includes(islandKey)) {
      setVisitedIslands((prevVisitedIslands) => [...prevVisitedIslands, islandKey]);
      navigate('/battleship'); // Navigate to the battleship component when visiting an island
    } else {
      alert('Already visited');
      setShipPosition(position);
    }
  };

  const renderMap = () => {
    const mapRows = [];
    for (let row = 0; row < 9; row++) { // 9 rows
      const mapCells = [];
      for (let col = 0; col < 9; col++) { // 9 columns
        const cellKey = `${row}-${col}`;
        const island = isIsland(col, row);
        const isVisited = visitedIslands.includes(cellKey);

        mapCells.push(
          <div
            key={cellKey}
            className={`map-cell ${island ? 'island' : 'ocean'} ${isVisited ? 'visited' : ''}`}
          >
            {shipPosition.x === col && shipPosition.y === row && (
              <img src={shipImage} alt="Ship" className="ship" />
            )}
            {enemyShipPosition.x === col && enemyShipPosition.y === row && (
              <img src={enemyShipImage} alt="Enemy Ship" className="enemy-ship" />
            )}
          </div>
        );
      }
      mapRows.push(<div key={row} className="map-row">{mapCells}</div>);
    }
    return mapRows;
  };

  return (
    <div className="map-container">
      <h1>Map Screen</h1>
      <p>Welcome to the map screen! Here you can see different locations and plan your next battle.</p>
      <div className="map">{renderMap()}</div>
      <button onClick={handleBackToGame}>Back to Game</button>
    </div>
  );
}

export default Map;
