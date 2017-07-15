import React, { Component } from 'react';
import { GoogleSignin } from 'react-native-google-signin';
import Button from '../../../components/Button';
import { socialAuth } from '../Auth';
import styles from './styles';

export default class GoogleAuth extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
    })
    .then(() => {
      GoogleSignin.currentUserAsync().then((user) => {
        if (user) {
          const userData = {
            name: user.name,
            email: user.email,
            pictureUrl: user.photo,
            googleId: user.idToken,
          }
          socialAuth(userData);
          this.setState({ user: user });
        }
      }).done();
    });
  }

  render() {
    return (
      <Button full iconName='logo-google' text='Google +' style={styles.googleButton} onPress={this.props.onPress} />
    )
  }
}
