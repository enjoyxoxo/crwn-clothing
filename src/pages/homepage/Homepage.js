import React from 'react';
import './Homepage.scss';
import Directory from '../../components/directory/directory';

function Homepage() {
  return (
    <div>
      <div className='homepage'>
        <Directory />
      </div>
    </div>
  )
}

export default Homepage