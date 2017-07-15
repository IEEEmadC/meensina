import React, { Component } from 'react';
import { Grid, Col } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import GoogleButton from './googleAuth.js';
import FacebookButton from './facebookAuth.js';
import { socialAuth } from '../Auth';

export default class SocialButton extends Component {
  constructor(props) {
    super(props);
  }

  googleAuth = () => {
    GoogleSignin.signIn().then((user) => {
      if(user) {
        const userData = {
          name: user.name,
          email: user.email,
          pictureUrl: user.photo,
          googleId: user.idToken,
        }
        socialAuth(userData);
      }
    }).catch(() => {
      alert('Ocorreu um erro. Por favor, tente novamente.')
    }).done();
  }

  render() {
    return (
      <Grid style={{ flex: 1 }}>
        <Col>
          <FacebookButton />
        </Col>
        <Col>
          <GoogleButton onPress={this.googleAuth}/>
        </Col>
      </Grid>
    )
  }
}
