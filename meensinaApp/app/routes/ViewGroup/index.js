import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Icon, Footer, FooterTab, Spinner, Text } from 'native-base';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Hr from 'react-native-hr';
import { findWhere } from 'underscore';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import ContentUser from './Content';
import Button from '../../components/Button';
import List from '../../components/List';
import Api from '../../config/axios';

export class ViewGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: this.props.navigationState,
      heartFavorite: false,
      heartColor: '#BDBDBD',
      groupInfo: [],
      groupUsers: [],
      exitGroup: false,
      hideChat: false,
    };
  }

  componentWillMount() {
    this.props.fetchUser();
    const user = this.props.me;
    const groupId = this.state.group.groupId;
    Api.get(`/group/${groupId}`).then(group => {
      const groupInfo = group.data[0];
      this.setState({ groupInfo, groupUsers: groupInfo.groupUsers });
      this.checkUserExists();
    }).catch((err) => { console.log(err);})
  }

  joinGroup() {
    Alert.alert(
      'Participar do Grupo',
      'Ao confirmar, você poderá interagir com outros participantes.',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          const groupId = this.state.group.groupId;
          Api.post(`/group/${groupId}`).then((response) => {
            const userInfo = { user: this.props.me }
            this.setState({ groupUsers: this.state.groupUsers.concat(userInfo), userExists: true, hideChat: false })
          }).catch(err => Alert.alert('Ops! Ocorreu um erro.', 'Você já está participando da aula'));
        }},
      ],
      { cancelable: false }
    )
  }

  favoriteUser = () => {
    if (!this.state.heartFavorite) {
      Alert.alert(
        'Seguir usuário?', //set props name
        'Você receberá notificações e poderá acompanhar ativiades recentes',
        [
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {
            this.setState({
              heartColor: '#B71C1C',
            })
            this.state.heartFavorite = true;
          }},
        ],
        { cancelable: false }
      )
    } else {
      this.setState({ heartColor: '#BDBDBD' });
      this.state.heartFavorite = false;
    }
  }

  checkUserExists() {
    // Check if user is admin or student in group
    const { groupUsers, groupInfo } = this.state;
    const user = this.props.me;
    const users = [];
    groupUsers.map((userData) => {
      users.push(userData.user);
      const userExists = findWhere(users, { id: user.id });
      if (!userExists) {
        this.setState({
          exitGroup: false,
          hideChat: true
        })
      }
    })
    const admin = groupInfo.groupData;
    if (admin.user.id === user.id) {
      this.setState({
        exitGroup: false,
      })
    }
  }

  exitGroup() {
    const groupId = this.state.group.groupId;
    Api.post(`/group/exit/${groupId}`).then(response =>
      Alert.alert('Sucesso!', 'Você não está mais participando desta aula')).catch((err) => {
      Alert.alert('Ops, ocorreu um erro.', 'Por favor, tente novamente.')
    })
  }

  render() {
    const { groupInfo, groupUsers, exitGroup, hideChat } = this.state;
    const group = groupInfo.groupData;

    return (
      <Container>
        <Header>
           <Left>
              <Button transparent iconName='arrow-back' onPress={Actions.home} />
           </Left>
         </Header>
         {group ? (
           <Content>
              <ContentUser
                title={group.name}
                subtitleName={group.user.name}
                subtitleLocal={group.local}
                userAvatar={group.user.picture_url || 'https://goo.gl/Qn2hxg' }
                days={group.days}
                beginHour={group.begin_hour}
              />
              <Hr lineColor='#B9B8B8'/>
              {groupUsers.map((userData) =>
                <List
                  avatar
                  title={userData.user.name}
                  userAvatar={userData.user.picture_url || 'https://goo.gl/Xrs5b0' }
                  key={userData.user.id}
                  showSubtitle={false}
                  showFavorite={true}
                />
              )}
            </Content>
            ) : (
              <Content>
                <Spinner color='blue' />
              </Content>
            )
          }
        <Footer>
          <FooterTab>
            {exitGroup ? (
              <Button iconName='md-exit' text='Sair' onPress={() => this.exitGroup()}/>
            ) : (
              <Button iconName='contacts' text='Participar' onPress={() => this.joinGroup()}/>
            )}
            { !hideChat && (
              <Button iconName='chatboxes' text='Chat' onPress={() => Actions.viewGroupChat({ groupId: group.id })} />
            )}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { me: state.user.me };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewGroup);
