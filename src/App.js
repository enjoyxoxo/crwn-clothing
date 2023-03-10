import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/Homepage';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Shop from './pages/shop/shop';
import Header from './components/header/header';
import SignInsignUp from './pages/signInsignUp.js/signInsignUp';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';
import { setCurrentUser } from './redux/user/userActions';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
     const { setCurrentUser } = this.props;
     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
       if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
             setCurrentUser({
                   id: snapShot.id,
                   ...snapShot.data()
             });
          });
       }

       setCurrentUser(userAuth);
     });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route  path='/shop' component={Shop} />
          <Route  exact path='/signin' render={() => 
           this.props.currentUser ? (<Redirect to='/' /> ) : (<SignInsignUp />)
           } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
   currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);