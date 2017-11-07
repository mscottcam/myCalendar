import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'

import {Actions} from 'react-native-router-flux'
import {Button} from 'native-base'
import Agenda from './agenda'

export default class MonthView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }

  componentDidMount() {
    console.log('PROPSSSS======>>', this.props.date, this.props.title)
  }

  logout() {
    console.log('logging out')
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out')
        Actions.login()
      })
      .catch(error => {
        console.error(error)
        alert(error)
      }) 
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.button} onPress={() => this.logout()} >
          <Text>Logout?</Text>
        </Button>
        <Agenda />
      </View> 
    ); 
  } 
}

const styles = StyleSheet.create({
  calendar: {
   borderColor: '#bbb',
   borderBottomWidth: 1
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    marginTop: 60,
    flex: 1,
    marginBottom: -200
  },
  button: {
    width:200, 
    justifyContent: 'center', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    height: 30
  }
});
