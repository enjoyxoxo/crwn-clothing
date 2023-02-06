import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/Homepage';
import { Switch, Route } from 'react-router-dom';
import Shop from './pages/shop/shop';
import Header from './components/header/header';
import SignInsignUp from './pages/signInsignUp.js/signInsignUp';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';

class App extends Component {
  constructor() {
      super();

      this.state = {
        currentUser: null
      }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
       if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
             this.setState({
                currentUser: {
                   id: snapShot.id,
                   ...snapShot.data()
                }
             });
             console.log(this.state);
          });
       }

       this.setState({ currentUser: userAuth });
     })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route  path='/shop' component={Shop} />
          <Route  path='/signin' component={SignInsignUp} />
        </Switch>
      </div>
    )
  }
}

export default App;