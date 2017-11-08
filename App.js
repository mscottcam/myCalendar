import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as firebase from 'firebase'
import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Title } from 'native-base'
import Router from './Router'

export default class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDVooUqk4vDR-PlU6bbtLLQGsIiYVlSOLY",
      authDomain: "calendar-5f1ea.firebaseapp.com",
      databaseURL: "https://calendar-5f1ea.firebaseio.com",
      projectId: "calendar-5f1ea",
      storageBucket: "calendar-5f1ea.appspot.com",
      messagingSenderId: "51447701809"
    })
  }

  render() {
    return (
      <Router />
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
