import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './images/start_bg_one_piece.jpg';

function Home() {
    const linkStyle = {
        position: 'absolute',
        bottom: '20vh', // adjust as needed
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '50px', // adjust as needed
        color: '#fff', // adjust color as needed
        fontWeight: 'bold',
        textDecoration: 'none',
        textShadow: '5.8px 5px 7px rgba(0.9, 0.2, 0.2, 0.5)'
      };

      const lineStyle = {
        position: 'absolute',
        bottom: '18vh', // adjust as needed (20vh from link + 60px line height)
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw', // width of the line
        height: '3px', // line thickness
        background: `linear-gradient(to right, rgba(255, 255, 255, 0), #fff, rgba(255, 255, 255, 0))`, // faded effect at ends
      };
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <Link to="/map" style={linkStyle}>
                Lookout for ONE PIECE
            </Link> 
            <div style={lineStyle}></div>
        </div>
        
    );
}

export default Home;
