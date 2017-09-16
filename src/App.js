import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDpl9ISC3csSMHyt5W7fKrT7QA1f9yMshI',
      authDomain: 'reactnative-authapp.firebaseapp.com',
      databaseURL: 'https://reactnative-authapp.firebaseio.com',
      projectId: 'reactnative-authapp',
      storageBucket: 'reactnative-authapp.appspot.com',
      messagingSenderId: '415577758177'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
    case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
        Log out
        </Button>
      );
    case false:
      return <LoginForm />;
    default:
      return <Spinner size="large" />;
    }
  }

  render() {
    return (
       <View>
        <Header headerText="Authentication" />
        { this.renderContent() }
       </View>
    );
  }
}

export default App;
