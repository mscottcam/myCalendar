import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import * as firebase from 'firebase'

import { Agenda } from 'react-native-calendars';
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'

// const database = firebase.database();

export default class AgendaView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        '2018-01-30': [{text: 'test event 1'},{text: 'test event 2'}]
      }
    };
  }

  componentWillMount() {

    const currentUserId = firebase.auth().currentUser.uid;
    const currentUserEmail = firebase.auth().currentUser.email;


    // if (!this.props.newText) {
    //   return
    // } else {
    //   const propsDate = '2018-01-30';
    //   // this.props.newDate
    //   const propsText = {text: this.props.newText}
    //   // this.addEventToState(propsDate, propsText);
    // }
    this.updateUserDates(currentUserId, this.state.items);
    console.log('items ---->', firebase.database().ref(`users/${currentUserId}/items`).once('value'))
  }

  addEventToState(date, eventText) {
    for (let key in this.state.items) {
      if (key === date) {
        const oldDateNewArray = [...this.state.items[date], eventText]
        const oldDateNewObj = {};
        oldDateNewObj[date] = oldDateNewArray;
        this.setState({
          items: Object.assign({}, this.state.items, oldDateNewObj)
        })
      }
      if (key !== date) {
        const newDateNewArray = [eventText]
        const newDateNewObj = {};
        newDateNewObj[date] = newDateNewArray;
        this.setState({
          items: Object.assign({}, this.state.items, newDateNewObj)
        })
      }
    }
  }

  updateUserDates(userId, items) {
    firebase.database().ref('users/' + userId).set({
      items: items
    })
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

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
         <Text>{item.text}</Text>
      </View>
    );
  }

  loadItems(day) {
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key]
    })
    this.setState({
      items: newItems
    });
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.button} onPress={() => this.logout()} >
          <Text>Logout?</Text>
        </Button>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.state.selected}
          renderItem={this.renderItem.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
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
    marginBottom: 2,
    height: 30
  }
});
