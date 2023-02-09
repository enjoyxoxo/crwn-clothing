import React from 'react';
import CustomButton from '../customButton/customButton';
import './cartdropdown.scss';

function Cartdropdown() {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items' />
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

export default Cartdropdown;