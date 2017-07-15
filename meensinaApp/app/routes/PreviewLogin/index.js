import React, { Component } from 'react';
import { Container, Content, Text, Button, Footer, FooterTab } from 'native-base';
import { View, AsyncStorage } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Actions } from 'react-native-router-flux';
import Api from '../../config/axios';

export default class PreviewLogin extends Component {
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
        <Content style={{ backgroundColor: '#0d5d80'}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
            <ResponsiveImage source={require('../../images/logo-meensina.png')} initWidth="250" initHeight="140" style={{ marginTop: 200}}/>
          </View>
        </Content>
        <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button onPress={Actions.login}>
              <Text style={{color: 'black', fontSize: 15 }} >ENTRAR</Text>
            </Button>
            <Button onPress={Actions.register}>
              <Text style={{color: 'black', fontSize: 15 }}>REGISTRE-SE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
