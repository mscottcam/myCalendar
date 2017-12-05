import React from 'react'
import { StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux'


export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.signup=this.signup.bind(this)
  }

  signup(email, pass) {
    console.log('signup running')
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(response => {
        console.log('signup response id -------->', response.uid)
        this.setState({
          email: response.email,
          id: response.uid
        })
        firebase.database().ref('users/' + response.uid).set({
          email: response.email,
          userId: response.uid,
          items: {}
        })
        //navigate here
        Actions.agendaView({userId: response.uid, eamil: response.email})
      })
      .catch(error => {
        console.error(error)
        alert(error)
      })
  }

  render() {
    return (
      <Container style={styles.container} >
        <Content>
          <Form>
            <Item>
              <Input placeholder="Email" onChangeText={ email => this.setState({email})} required/>
            </Item>
            <Item>
              <Input placeholder="Password" onChangeText={ password => this.setState({password})}  required/>
            </Item>
          </Form>
          <Button style={styles.button} block onPress={() => this.signup(this.state.email, this.state.password)} >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 65
  },
  header: {
    alignItems: 'center',
    height: 75,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    width: 300,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  text: {
    fontSize: 30
  }
});
