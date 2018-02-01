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
      },
      userId: '',
      email: ''
    };
  }

  componentDidMount() {
    console.log('here is login email -->', this.props.loginEmail);
    console.log('here is login id', this.props.loginId);
    console.log('here is the sign Up Email ', this.props.signUpEmail);
    console.log('here is the signup user id', this.props.signUpUserId);
    if (this.props.loginEmail) {
      this.setState({
        userId: this.props.loginId,
        email: this.props.loginEmail
      })
    }
    const updateUserDates = (email, userId, items) => {
      console.log('here is the email going with db call', email);
      console.log('here is the id going with the db call', userId);
      console.log('here are the items going with the db call', items);
      firebase.database().ref('users/' + userId).set({
        email: email,
        userId: userId,
        items: items
      })
    }
    const propsDate = this.props.newDate
    const propsText = {text: this.props.newText}
    const addEventToState = () => {
      for (let key in this.state.items) {
        if (key === propsDate) {
          const oldDateNewArray = [...this.state.items[propsDate], propsText]
          const oldDateNewObj = {};
          oldDateNewObj[propsDate] = oldDateNewArray;
          this.setState({
            items: Object.assign({}, this.state.items, oldDateNewObj)
          })
        }
        if (key !== propsDate) {
          const newDateNewArray = [propsText]
          const newDateNewObj = {};
          newDateNewObj[propsDate] = newDateNewArray;
          this.setState({
            items: Object.assign({}, this.state.items, newDateNewObj)
          })
        }
      }
    }
    if (!this.props.newText) {
      return
    } else {
      addEventToState();
    }
    updateUserDates(this.state.email, this.state.userId, this.state.items);
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
