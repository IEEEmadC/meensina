import React, { Component } from 'react';
import { Text, Container, Content, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import MultipleChoice from 'react-native-multiple-choice';
import DatePicker from 'react-native-datepicker';
import Form from '../../../components/Form';
import Button from '../../../components/Button';
import Radio from '../../../components/Radio';
import Header from '../../../components/Header';
import Api from '../../../config/axios';
import style from './styles.js';
import { Alert } from 'react-native';

const daysList = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

export default class GroupCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitBody: {
        name: '',
        description: '',
        local: '',
        privated: false,
        days: '',
        beginHour: '',
        password: '',
      },
      showPassword: null,
      selectedDays: [],
      selectedCheckbox: false,
      disabled: true,
    };
  }

  handleClick() {
    const password = Math.random().toString(36).slice(-5);
    this.setState(prevState => ({
      selectedCheckbox: !prevState.selectedCheckbox,
      showPassword: !prevState.showPassword,
    }));
    const privated = !this.state.selectedCheckbox;
    this.handleChangeForm('password', password);
    this.handleChangeForm('privated', privated);
  }

  openModal() {
    this.refs.modal.open();
  }

  onSelectionsChange(option) {
    const { selectedDays } = this.state;
    let index = selectedDays.indexOf(option);
    if (selectedDays.length === 0) {
      selectedDays.push(option);
    } else if (index === -1) {
      selectedDays.push(option);
    } else if (index > -1){
      selectedDays.splice(index, 1);
    }
    const daysList = selectedDays.join(', ');
    this.handleChangeForm('days', daysList);
    this.setState({ selectedDays, daysList });
  }

  handleChangeForm(field, value) {
    const { submitBody } = this.state;
    submitBody[field] = value;
    if (submitBody.beginHour) {
      submitBody.beginHour = submitBody.beginHour.toString();
    }
    this.setState({
      submitBody,
    })
    const { name, local, description, days } = submitBody;
    if (name && local && description && days) {
      this.setState({
        disabled: false,
      })
    }
  }

  onSubmit() {
    const { submitBody } = this.state;
    Api.post('/groups', submitBody).then(() => {
      Alert.alert('Parabéns!', 'Seu grupo foi criado com sucesso!');
    }).catch(() => {
      Alert.alert('Ops...', 'Ocorreu algum erro. Tente novamente mais tarde');
    });
  }

  render(){
    const { showPassword, submitBody, disabled, selectedCheckbox } = this.state;
    const { password, beginHour, days } = submitBody;
    return(
      <Container>
        <Content>
          <Header iconLeft='arrow-back' title='Criar Grupo' onPress={Actions.home}/>
          <Form
            label='Nome do Grupo'
            floatingLabel
            onChangeText={(name) => this.handleChangeForm('name', name)}
          />
          <Form
            label='Local'
            floatingLabel
            onChangeText={(local) => this.handleChangeForm('local', local)}
          />
          <Form
            label='Assuntos'
            floatingLabel
            onChangeText={(description) => this.handleChangeForm('description', description)}
          />
          <Radio
            text='Grupo Privado'
            selected={selectedCheckbox}
            onPress={() => this.handleClick()}
          />
          <Content style={{ margin: 16 }}>
            { showPassword &&
              <Text style={{ textAlign: 'center', marginBottom: 16 }}>
                Senha: { password }
              </Text>
            }
            <Text style={{ marginBottom: 16 }}>
              Horário
            </Text>
            <DatePicker
              style={{width: 200}}
              date={beginHour}
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              onDateChange={(beginHour) => this.handleChangeForm('beginHour', beginHour)}
            />
            <Text style={{ marginTop: 16, marginBottom: 16 }} onPress={() => this.openModal()}>
              Clique aqui para selecionar os dias
            </Text>
            <Text>
              Dias selecionados: { days }
            </Text>
          </Content>
        </Content>
        <Modal style={style.modal} position={"bottom"} ref={'modal'}>
          <Content>
            <MultipleChoice
              options={daysList}
              maxSelectedOptions={7}
              onSelection={(option) => this.onSelectionsChange(option)}
              style={{ margin: 16 }}
            />
          </Content>
        </Modal>
        <Footer >
          <FooterTab>
            <Button
              full={true}
              iconName='checkmark'
              text='Começar'
              disabled={disabled}
              onPress={() => this.onSubmit()}
            />
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
