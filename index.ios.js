import React, { Component } from 'react'
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class rng extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Anonymous',
      loading: false,
      randomNumber: 0,
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
          disabled={this.state.loading}
        />
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

AppRegistry.registerComponent('rng', () => rng)
