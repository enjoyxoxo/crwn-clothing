import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebaseUtils';
import CartIcon from '../cartIcon/cartIcon';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.scss';
import Cartdropdown from '../cartDropdown/cartdropdown';

function Header({ currentUser, hidden }) {
  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {
          currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className='option' to='/signin'>SIGN IN</Link>
        }
        <CartIcon />
      </div>
      {hidden ? null : <Cartdropdown />}
    </div>
  )
}

const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
   currentUser,
   hidden
});

export default connect(mapStateToProps)(Header);