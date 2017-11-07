import React from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import {Button} from 'native-base'
import {Actions} from 'react-native-router-flux'

export default class NewEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      text: ''
    }
  }
  
  render() {
    return (
      <View style={{paddingTop: 100}}>
        <FormLabel>New Event</FormLabel>
        <FormInput placeholder="date" onChangeText={ date => this.setState({date})} />
        <FormInput placeholder="event" onChangeText={ text => this.setState({text})} />
        {/* <Picker></Picker> */}
         <Button style={styles.button} onPress={() => {
           Actions.agendaView({date: this.state.date, text: this.state.text})
           }} >
           <Text>Add Event</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width:200, 
    justifyContent: 'center',
    marginTop: 20, 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    height: 30
  }
});
