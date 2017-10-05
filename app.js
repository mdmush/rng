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
    let randomNumber = Math.floor(Math.random() * 100)

    setTimeout(() => {
      this.setState({randomNumber, loading: false})
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
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
                    alert(data.accessToken.toString())
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error)
                        alert('Error fetching data: ' + error.toString());
                      } else {
                        console.log(result)
                        alert('Success fetching data: ' + result.toString());
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
          onLogoutFinished={() => alert("logout.")}/>
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
