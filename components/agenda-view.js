import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import * as firebase from 'firebase'
import {Agenda} from 'react-native-calendars';
import {Actions} from 'react-native-router-flux'
import {Button} from 'native-base'


export default class AgendaView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        '2017-11-08': [{text: 'test event 1'},{text: 'test event 2'}]
      }
    };
  }

  componentDidMount() {
    console.log('date coming over', this.props.date)
    console.log('text coming over', this.props.text)
    const propsDate = this.props.date
    const propsText = {text: this.props.text}
    let addEventToState = () => {
      let itemsToAdd = {};
      for (let key in this.state.items) {
        console.log('key --->', key)
        if (key === propsDate) {
          console.log('got here')
          itemsToAdd[propsDate] = [...this.props.items[propsDate], propsText]
        }
        if (key !== propsDate) {
          console.log('not there')
        }
      }
      this.setState({
        items: itemsToAdd
      });
    }
    addEventToState()
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
    console.log('item', item)
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
    height: 30
  }
  // emptyDate: {
  //   height: 15,
  //   flex:1,
  //   paddingTop: 30
  // }
});          

 