import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Anonymous',
      loading: false,
      randomNumber: 0,
      login: false
    }
  }

  _fbLogin(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          alert('Login success with permissions: '+result.grantedPermissions.toString());
            this.setState({ login: true });
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  _onPressGenerate() {
    this.setState({loading: true})
    let randomNumber = Math.floor(Math.random() * 100)

    setTimeout(() => {
      this.setState({randomNumber, loading: false})
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.login == true ? <View><Text style={styles.welcome}>
          Hello, {this.state.name}!
        </Text>

        <Text style={styles.number}>
          {this.state.loading ? '...' : this.state.randomNumber}
        </Text>

        <Button
          onPress={() => this._onPressGenerate()}
          title="GENERATE"
          color="#333333"
          disabled={this.state.loading}/>
          </View> :  <View> <Button style={styles.fbButton} onPress={() => this._fbLogin()} title="Login With Facebook" color="#333333" /> </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  number: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 50,
  },
})
