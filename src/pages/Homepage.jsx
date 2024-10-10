import React from 'react';
import Welcome from '../components/Welcome';
import Cvstore from '../components/Cvstore';
// import Hello from '../components/Hello.jsx';

function Homepage() {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
        <Welcome />
        <Cvstore />
    </div>
  );
}

export default Homepage;
