import React, { Component } from 'react'
import {
  Container,
  Content,
  Item,
  Label,
  Input
} from 'native-base';
import Header from '../../../components/Header';
import { Actions } from 'react-native-router-flux';

export default class ChangePassword extends Component {

  static propTypes = {
    userPassword: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  userPassword() {
    alert('ok');
  }

  render() {
    return(
      <Container>
        <Content>
        <Header iconLeft='arrow-back' onPress={Actions.home}/>
          <Content style={{ margin: 16 }}>
            <Item inlineLabel>
               <Label>Senha Atual</Label>
               <Input value='' secureTextEntry maxLength={10}/>
            </Item>
            <Item inlineLabel>
               <Label>Nova Senha</Label>
               <Input value='' secureTextEntry maxLength={10}/>
            </Item>
            <Item inlineLabel>
               <Label>Repetir Senha</Label>
               <Input value='' secureTextEntry maxLength={10}/>
            </Item>
          </Content>
        </Content>
      </Container>
    );
  }
}
