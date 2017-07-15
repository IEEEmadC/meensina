import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';
import style from './styles';
import { Actions } from 'react-native-router-flux';

export default class FabButton extends Component {
  render() {
    return(
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#3498db' title="Criar Grupo" onPress={() => { Actions.groupCreate()}}>
          <Icon name="md-people" style={style.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Criar Monitoria" onPress={() => {Actions.roomCreate()}}>
          <Icon name="md-school" style={style.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    )
  }
}
