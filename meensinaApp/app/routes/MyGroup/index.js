import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Right, Icon, Body } from 'native-base';
import { Alert } from 'react-native';
import Api from '../../config/axios';
import Header from '../../components/Header';
import { Actions } from 'react-native-router-flux';

export default class MyGroup extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
    }
  }
  componentDidMount() {
    Api.get('/student/group').then((response) => {
      const groups = response.data;
      this.setState({ groups });
    }).catch(() => {
      Alert.alert('Ops, ocorreu algum erro!', 'Por favor tente novamente mais tarde.')
    })
  }

  render() {
    const { groups } = this.state;
    return(
      <Container>
          <Content>
            <Header iconLeft='arrow-back' onPress={Actions.home}/>
            <List>
            {groups.map(groupInfo => (
              <ListItem key={groupInfo.group_id} onPress={() => Actions.viewRoom({ groupId: groupInfo.group_id })}>
                 <Body>
                <Text>{groupInfo.group.discipline}</Text>
                <Text>Monitor: {groupInfo.group.user.name}</Text>
              </Body>
                <Right>
                    <Icon name='arrow-forward' />
                </Right>
              </ListItem>
            ))}
          </List>
          </Content>
      </Container>
    )
  }
}
