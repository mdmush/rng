import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
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

  _onPressGenerate() {
    this.setState({loading: true})
    fetch('https://api.random.org/json-rpc/1/invoke', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'generateIntegers',
        params: {
          apiKey: 'ba471cb0-0514-4ffb-8eaa-ed8930b296d8',
          n: 1,
          min: 1,
          max: 1000,
          replacement: true
        },
        id: 42
      })
    })
    .then((response => response.json()))
    .then((responseJson) => {
      setTimeout(() => {
        this.setState({randomNumber: responseJson.result.random.data, loading: false})
      }, 1000)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.login == true ?
          <View style={styles.randomConatiner}>
          <Text style={styles.welcome}>
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
            </View>
          : null
        }
          <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error)
                      } else {
                        this.setState({name: result.name, login: true})
                      }
                    }

                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: data.accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name'
                          }
                        }
                      },
                      responseInfoCallback
                    );

                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                )
              }
            }
          }
          onLogoutFinished={() => {
            this.setState({login: false})
          }}/>
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
  randomConatiner:{
    marginBottom: 50
  }
})
