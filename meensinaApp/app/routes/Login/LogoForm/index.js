import React, { Component } from 'react';
import ResponsiveImage from 'react-native-responsive-image';
import { View } from 'react-native';

export default class LogoForm extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <ResponsiveImage source={require('../../../images/logo-login.png')} initWidth="250" initHeight="140"/>
        </View>
      </View>
    )
  }
}
