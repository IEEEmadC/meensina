import React, { Component } from 'react';
import Button from '../../../components/Button';
import styles from './styles';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { socialAuth } from '../Auth';
import * as Fb from './utils/Fb';


export default class FacebookButton extends Component {
  constructor(props) {
    super(props);
  }

  handleFacebookLogin() {
    LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
      'user_friends'
    ]).then((result) => {
        if (result.isCancelled) {
          alert('Login Cancelado');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            Fb.getProfile(accessToken).then((user) => {
              socialAuth(user);
            })
          });
        }
      }, (error) => {
        alert('Tentativa de Login falhou: ' + error);
      }
    );
  }

  render() {
    return (
      <Button full iconName='logo-facebook' text='Facebook' style={styles.fbButton} onPress={this.handleFacebookLogin} />
    );
  }
}
