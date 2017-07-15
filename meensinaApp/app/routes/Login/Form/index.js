import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Form, Item, Button, Text, Label, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import style from './styles';
import Api from '../../../config/axios';

export default class FormLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    }
  }

  async setToken(token) {
    await AsyncStorage.setItem('token', token);
  }

  authUser() {
    const { username, password } = this.state;
    Api.post('/auth', {
      username,
      password,
    }).then((response) => {
      const token = `Bearer ${response.data.token}`;
      Api.defaults.headers.common['Authorization'] = token;
      this.setToken(token);
      Actions.home();
    }).catch(() => {
      this.setState({
        error: true,
      });
    });
  }

  render() {
    return (
      <View>
        <Form style={style.formLogin}>
          <Item error={this.state.error} floatingLabel last>
              <Label>Email</Label>
              <Input
                value={this.state.username}
                keyboardType='email-address'
                onChangeText={(username) => this.setState({username})}
              />
          </Item>
          <Item error={this.state.error} floatingLabel last >
              <Label>Senha</Label>
              <Input
                secureTextEntry
                value={this.state.password}
                selectTextOnFocus
                onChangeText={(password) => this.setState({password})}
              />
          </Item>
          { this.state.error &&
            <Text style={style.errorMessage}>Email ou senha incorretos</Text>
          }
          <Button onPress={() => this.authUser()} block style={style.buttonLogin}>
            <Text>Entrar</Text>
          </Button>
        </Form>
      </View>
    )
  }
}
