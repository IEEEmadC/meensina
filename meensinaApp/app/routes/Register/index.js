import React, { Component } from 'react';
import { Container, Left, Content, Form, Item, Button, Text, Label, Input, ListItem, CheckBox, Header } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import style from './styles';
import Api from '../../config/axios';
import validateEmail from '../../utils';
import ButtonHeader from '../../components/Button';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
      repeatPassword: undefined,
      checked: false,
      error: {
        status: false,
        message: undefined,
      }
    }
  }

  authUser() {
    const { name, email, password, repeatPassword } = this.state;
    if (password !== repeatPassword) {
      this.setState({
        error: {
          status: true,
          message: 'Senhas não conferem',
        },
      });
      return false;
    }

    if (validateEmail(email)) {
      Api.post('/user/register', {
        name,
        email,
        password,
      }).then(() => {
        Alert.alert(
          'Sucesso!',
          'Usuário cadastrado com sucesso!',
          [{
            text: 'OK', onPress: () => Actions.login()
          }],
        );
      }).catch(() => {
        this.setState({
          error: {
            status: true,
            message: 'Email já cadastrado',
          }
        });
      });
    } else {
      Alert.alert('Ops... ocorreu um erro', 'Por favor, digite um email válido')
    }
  }

  _check() {
    if (this.state.checked) {
      this.setState({
        checked: false,
      })
      return;
    }
    this.setState({
      checked: true,
    })
  }

  render() {
    const { error } = this.state;
    return(
      <Container>
        <Header>
           <Left>
              <ButtonHeader transparent iconName='arrow-back' onPress={Actions.login} />
           </Left>
         </Header>

        <Content>
          <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 20 }}>Registre-se!</Text>
          <Form style={style.formLogin}>
            <Item error={error.status} floatingLabel last>
                <Label>Nome</Label>
                <Input
                  value={this.state.name}
                  keyboardType='email-address'
                  onChangeText={(name) => this.setState({name})}
                />
            </Item>
            <Item error={error.status} floatingLabel last>
                <Label>Email</Label>
                <Input
                  value={this.state.email} keyboardType='email-address' onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item error={error.status} floatingLabel last >
                <Label>Senha</Label>
                <Input secureTextEntry value={this.state.password} selectTextOnFocus onChangeText={(password) => this.setState({password})}/>
            </Item>
            <Item error={error.status} floatingLabel last >
                <Label>Repetir Senha</Label>
                <Input secureTextEntry value={this.state.repeatPassword} selectTextOnFocus onChangeText={(repeatPassword) => this.setState({repeatPassword})}/>
            </Item>
            <ListItem>
              <CheckBox onPress={() => this._check()} checked={this.state.checked} />
              <Text> Já sou monitor ou instrutor de uma disciplina</Text>
            </ListItem>
            { error.status &&
              <Text style={style.errorMessage}>{error.message}</Text>
            }
            <Button onPress={() => this.authUser()} block style={style.buttonLogin}>
              <Text>Entrar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}
