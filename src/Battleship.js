import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Battleship.css';
import { Link } from 'react-router-dom';

class Ship {
  constructor(name, initialHp, initialMp) {
    this.name = name;
    this.hp = initialHp;
    this.mp = initialMp;
  }

  attack(target, damage, mpCost) {
    if (this.hp <= 0 || target.hp <= 0) {
      return false; // Either the attacking ship or the target ship is already defeated
    }
    if (this.mp >= mpCost) {
      target.hp -= damage;
      if (target.hp < 0) {
        target.hp = 0; // Ensure HP doesn't go below 0
      }
      this.mp -= mpCost;
      return true; // Attack successful
    } else {
      return false; // Not enough MP for the attack
    }
  }
}

function Battleship() {
  const [sunnyGo, setSunnyGo] = useState(new Ship("Sunny Go", 300, 150));
  const [marineShip, setMarineShip] = useState(new Ship("Marines", 100, 50));
  const [enemyDefeated, setEnemyDefeated] = useState(false);
  const [displayMPMessage, setDisplayMPMessage] = useState("");
  const [clickedButton, setClickedButton] = useState(null);
  const navigate = useNavigate();

  const handleAttack = (attacker, target, damage, mpCost, buttonId) => {
    if (attacker.hp <= 0 || target.hp <= 0) {
      setClickedButton(buttonId);
      setTimeout(() => setClickedButton(null), 400);
      return;
    }

    const updatedAttacker = new Ship(attacker.name, attacker.hp, attacker.mp); // Create a new instance of the attacker
    const updatedTarget = new Ship(target.name, target.hp, target.mp); // Create a new instance of the target

    const attackSuccess = updatedAttacker.attack(updatedTarget, damage, mpCost);

    if (!attackSuccess) {
      setDisplayMPMessage(`${updatedAttacker.name} does not have enough MP to perform the attack`);
    } else {
      setDisplayMPMessage("");
      if (updatedTarget.hp === 0) {
        setEnemyDefeated(true);
      }
    }

    if (attacker.name === sunnyGo.name) {
      setSunnyGo(updatedAttacker); // Update the state with the new attacker instance
    } else if (attacker.name === marineShip.name) {
      setMarineShip(updatedAttacker); // Update the state with the new attacker instance
    }

    if (target.name === sunnyGo.name) {
      setSunnyGo(updatedTarget); // Update the state with the new target instance
    } else if (target.name === marineShip.name) {
      setMarineShip(updatedTarget); // Update the state with the new target instance
    }
  };

  const handleGoToMap = () => {
    navigate('/map'); // Navigate to the Map component
  };

  const linkStyle = {
    position: 'absolute',
    top: '3vh', // adjust as needed
    transform: 'translateX(-99%)',
    fontSize: '50px', // adjust as needed
    color: '#fff', // adjust color as needed
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: '5.8px 5px 7px rgba(0.9, 0.2, 0.2, 0.5)'
  };

  return (
    <div className="wrapper-div">
      <Link to="/map" style={linkStyle}>
        Retreat
      </Link>
      <div className="child-div">
        <div>
          <div className='sunny-go'>
            <div className='sunny-hp'>
              HP: {sunnyGo.hp}
            </div>
            <div className='sunny-mp-container'>
              <div className='sunny-mp'>
                MP: {sunnyGo.mp}
              </div>
            </div>
            <div className="sunny-go-attributes">
              {sunnyGo.name}
            </div>
          </div>
          <div className="attacks">
            <button 
              onClick={() => handleAttack(sunnyGo, marineShip, 75, 50, 'sunnyAttack1')} 
              disabled={sunnyGo.mp < 50} 
              className={sunnyGo.mp < 50 && clickedButton === 'sunnyAttack1' ? 'error' : ''}
            >
              Attack 1
            </button>
            <button 
              onClick={() => handleAttack(sunnyGo, marineShip, 50, 25, 'sunnyAttack2')} 
              disabled={sunnyGo.mp < 25} 
              className={sunnyGo.mp < 25 && clickedButton === 'sunnyAttack2' ? 'error' : ''}
            >
              Attack 2
            </button>
            <button 
              onClick={() => handleAttack(sunnyGo, marineShip, 25, 10, 'sunnyAttack3')} 
              disabled={sunnyGo.mp < 10} 
              className={sunnyGo.mp < 10 && clickedButton === 'sunnyAttack3' ? 'error' : ''}
            >
              Attack 3
            </button>
          </div>
          <div>
            {displayMPMessage}
          </div>
        </div>
        <div>
          <div className='marine-ship'>
            <div className='marine-hp'>
              HP: {marineShip.hp}
            </div>
            <div className="marine-mp-container">
              <div className='marine-mp'>
                MP: {marineShip.mp}
              </div>
            </div>
            <div className="marine-attributes">
              {marineShip.name}
            </div>
          </div>
          <div className="attacks">
            <button 
              onClick={() => handleAttack(marineShip, sunnyGo, 35, 25, 'marineAttack1')} 
              disabled={marineShip.mp < 25} 
              className={marineShip.mp < 25 && clickedButton === 'marineAttack1' ? 'error' : ''}
            >
              Attack 1
            </button>
            <button 
              onClick={() => handleAttack(marineShip, sunnyGo, 25, 20, 'marineAttack2')} 
              disabled={marineShip.mp < 20} 
              className={marineShip.mp < 20 && clickedButton === 'marineAttack2' ? 'error' : ''}
            >
              Attack 2
            </button>
            <button 
              onClick={() => handleAttack(marineShip, sunnyGo, 10, 10, 'marineAttack3')} 
              disabled={marineShip.mp < 10} 
              className={marineShip.mp < 10 && clickedButton === 'marineAttack3' ? 'error' : ''}
            >
              Attack 3
            </button>
          </div>
        </div>
      </div>
      {enemyDefeated && (
        <div className="popup">
          <p>You won!</p>
          <button onClick={handleGoToMap}>Go to Map</button>
        </div>
      )}
    </div>
  );
}

export default Battleship;
