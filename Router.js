import React from 'react'
import {View, Button, Text} from 'react-native'
import {Scene, Router, Actions} from 'react-native-router-flux'
import { Icon } from 'react-native-elements'
import Login from './components/login'
import Signup from './components/signup'
import NewEventForm from './components/new-event-form'
import AgendaView from './components/agenda'

const RouterComponent = () => {
  return (
    <Router>
      <Scene>
        <Scene key="login" component={Login} title="Please Login!" />
        <Scene key="agendaView" component={AgendaView} title="Here is your life:" hideNavBar={false} renderRightButton={() => <Icon name='note-add' onPress={() => Actions.newEventForm()} />} />
        <Scene key="signup" component={Signup} title="Sign Up!" />
        <Scene key="newEventForm" component={NewEventForm} title="New Event" />     
      </Scene>
    </Router> 
  )
}

export default RouterComponent