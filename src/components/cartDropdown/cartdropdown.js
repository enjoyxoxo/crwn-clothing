import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../customButton/customButton';
import { selectCartItems } from '../../redux/cart/cartSelectors';
import './cartdropdown.scss';
import CartItem from '../cartItem/cartItem';

function Cartdropdown({ cartItems }) {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
         {cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

const mapStateToProps = state => ({
   cartItems: selectCartItems(state)
});

export default connect(mapStateToProps) (Cartdropdown);