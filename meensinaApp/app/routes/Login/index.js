import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import Hr from 'react-native-hr';
import SocialNetwork from './SocialNetwork';
import FacebookButton from './SocialNetwork/facebookAuth.js';
import Form from './Form';
import Api from '../../config/axios';
import LogoImage from './LogoForm';

export default class Login extends Component {
  constructor(props){
    super(props);
  }

  async getToken() {
    try {
      let value = await AsyncStorage.getItem('token');
      Api.defaults.headers.common['Authorization'] = value;
      return value;
    } catch (e) {
      alert(e);
    }
  }

  componentWillMount() {
    this.getToken().then((token) => {
      if (token) {
        Actions.home();
      } else {
        Actions.login();
      }
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <LogoImage />
          <Form />
          <Hr text="ou" lineColor='#B9B8B8'/>
          <FacebookButton />
        </Content>
      </Container>
    );
  }
}
