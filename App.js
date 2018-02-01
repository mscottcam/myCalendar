import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import * as firebase from 'firebase'

import { Icon } from 'react-native-elements'
import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Title } from 'native-base'
import {Scene, Router, Actions} from 'react-native-router-flux'

import Login from './components/login'
import Signup from './components/signup'
import NewEventForm from './components/new-event-form'
import AgendaView from './components/agenda-view'

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDVooUqk4vDR-PlU6bbtLLQGsIiYVlSOLY",
      authDomain: "calendar-5f1ea.firebaseapp.com",
      databaseURL: "https://calendar-5f1ea.firebaseio.com",
      projectId: "calendar-5f1ea",
      messagingSenderId: "51447701809"
    })
  }

  render() {
    return (
      <Router>
        <Scene>
          <Scene
            key="login"
            component={Login}
            title="Please Login!"
          />
          <Scene
            key="agendaView"
            component={AgendaView}
            title="Here is your life:"
            hideNavBar={false}
            renderRightButton={() => <Icon name='note-add' onPress={() => Actions.newEventForm()} />}
          />
          <Scene key="signup" component={Signup} title="Sign Up!" />
          <Scene key="newEventForm" component={NewEventForm} title="New Event" />
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 50,
    justifyContent: 'flex-start'
  },
});
