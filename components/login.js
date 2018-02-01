import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as firebase from 'firebase'
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux'
import Signup from './signup'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginEmail: '',
      loginPassword: ''
    }
    this.login=this.login.bind(this)
  }

  login(email, pass) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(response => {
        this.setState({
          loginEmail: '',
          loginPassword: ''
        })
        this.props.updateState(response.email, response.uid)
        Actions.agendaView()
        // {loginEmail: this.state.email, loginId: this.state.id}
      })
      .catch(error => {
        console.log(error)
        alert(error)
      })
  }

  render() {
    return (
      <Container style={styles.container} >
        <Content>
          <Form>
            <Item floatingLable>
              <Input
                placeholder="Email"
                onChangeText={ loginEmail => this.setState({loginEmail}) }
                required
              />
            </Item>
            <Item floatingLable last>
              <Input
                placeholder="Password"
                onChangeText={ loginPassword => this.setState({loginPassword}) }
                required
              />
            </Item>
          </Form>
          <Button
            style={styles.button}
            block
            onPress={() => this.login(this.state.loginEmail, this.state.loginPassword)}
          >
            <Text>Sign In</Text>
          </Button>
          <Button style={styles.button} block onPress={() => Actions.signup()}>
            <Text>Need to Create an Account?</Text>
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
    height: 10,
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
    marginTop: 10
  },
  text: {
    fontSize: 30
  }
});
