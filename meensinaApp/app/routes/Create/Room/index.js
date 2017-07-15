import React, { Component } from 'react';
import { Text, Content, Item, Input, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import Hr from 'react-native-hr';
import { Picker } from 'react-native';
import moment from 'moment';
import Form from '../../../components/Form';
import Button from '../../../components/Button';
import DatePicker from '../../../components/DatePicker';
import Header from '../../../components/Header';
import Api from '../../../config/axios';


export default class RoomCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRadio: false,
      discipline: undefined,
      studentTotal: 2,
      address: undefined,
      scholarityId: 1,
      datetimeBegin: new Date(),
      datetimeEnd: 30,
    };
  }

  handleClick = () => {
    this.setState(prevState => ({ selectedRadio: !prevState.selectedRadio }));
  };

  createMonitoring() {
    const submitBody = {
      discipline,
      address,
      studentTotal,
      datetimeBegin,
      description,
      scholarityId,
      datetimeEnd
    } = this.state;

    if (!submitBody.discipline || !submitBody.datetimeBegin || !submitBody.address) {
      Alert.alert('Ops, ocorreu um erro', 'Verifque se todos os campos foram preenchidos');
      return false;
    }

    const dateFormat = moment(this.state.datetimeBegin);
    const dateEnd = dateFormat.add(this.state.datetimeEnd, 'm');
    submitBody.datetimeEnd = dateEnd.format('YYYY-MM-DD HH:mm:ss');

    Api.post('/course', submitBody).then(() => {
      Alert.alert(
        'Sucesso!',
        'Em breve sua monitoria estará disponível!',
        [{
          text: 'OK', onPress: () => Actions.home()
        }],
      );
    }).catch(() => {
      Alert.alert('Ocorreu algum erro', 'Por favor, tente novamente mais tarde');
    });
  }

  render() {
    return (
      <Content>
        <Header iconLeft='arrow-back' title='Criar Monitoria' onPress={Actions.home}/>
        <Form label='Disciplina da Monitoria'
          value={this.state.discipline}
          floatingLabel
          onChangeText={(discipline) => this.setState({ discipline })}
        />
        <Form
          label='Local'
          value={this.state.address}
          floatingLabel
          onChangeText={(address) => this.setState({ address })}
        />
        {/* <Radio text='Monitoria Privada' selected={this.state.selectedRadio} onPress={() => this.handleClick()}/> */}
        <Content style={{ margin: 16 }}>
          <Text>
            Número de participantes
          </Text>
          <Picker
            selectedValue={this.state.studentTotal}
            onValueChange={(studentTotal) => this.setState({ studentTotal })}>
            <Picker.Item label="2 Alunos" value="2" />
            <Picker.Item label="3 Alunos" value="3" />
            <Picker.Item label="4 Alunos" value="4" />
            <Picker.Item label="5 Alunos" value="5" />
            <Picker.Item label="6 Alunos" value="6" />
            <Picker.Item label="7 Alunos" value="7" />
            <Picker.Item label="8 Alunos" value="8" />
            <Picker.Item label="9 Alunos" value="9" />
            <Picker.Item label="10 Alunos" value="10" />
          </Picker>
          <Text>
            Grau de escolaridade
          </Text>
          <Picker
            selectedValue={this.state.scholarityId}
            onValueChange={(scholarityId) => this.setState({ scholarityId })}>
            <Picker.Item label="Ensino Fundamental" value="1" />
            <Picker.Item label="Ensino Médio" value="2" />
            <Picker.Item label="Ensino Superior" value="3" />
          </Picker>
          <Text style={{ marginBottom: 16 }}>
            Quando inicia?
          </Text>
          <DatePicker date={this.state.datetimeBegin} onDateChange={(datetimeBegin) => this.setState({ datetimeBegin })} />
          <Text>
            Tempo de duração
          </Text>
          <Picker
            selectedValue={this.state.datetimeEnd}
            onValueChange={(datetimeEnd) => this.setState({ datetimeEnd })}>
            <Picker.Item label="30 minutos" value="30" />
            <Picker.Item label="45 minutos" value="45" />
            <Picker.Item label="1 hora" value="60" />
            <Picker.Item label="1h:30 minutos" value="90" />
            <Picker.Item label="2 horas" value="120" />
          </Picker>
          <Text style={{ marginBottom: 16, marginTop: 16 }}>
            Observações
          </Text>
          <Item inlineLabel>
            <Input placeholder='Ex.: O aluno deverá levar livro' value={this.state.description} onChangeText={(description) => this.setState({ description })}/>
          </Item>
          </Content>
        <Hr lineColor='#B9B8B8' />
        <Footer >
          <FooterTab>
            <Button full={true} iconName='checkmark' text='Começar' onPress={() => this.createMonitoring()}/>
          </FooterTab>
        </Footer>
      </Content>
    );
  }
}
