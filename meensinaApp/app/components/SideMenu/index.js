import React, { Component } from 'react';
import { Container, Content, Thumbnail, H3 } from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import styles from './styles';
import ListItem from '../ListItem';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../actions';


export class SideMenu extends Component {
  static defaultProps = {
    userAvatar: 'https://goo.gl/Xrs5b0'
  }

  static propTypes = {
    closeDrawer: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  logout() {
    AsyncStorage.clear().then(() => Actions.preview());
  }

  render() {
    let { closeDrawer } = this.props;
    const user = this.props.me;
    return (
      <Container style={styles.container} onPress={closeDrawer}>
        <Content>
            <Image source={require('../../images/background.png')} style={styles.userBackground} >
            { user &&
              <Content contentContainerStyle={styles.userImage}>
                <Thumbnail size={70} source={{ uri: user.picture_url || this.props.userAvatar }} />
                <H3 style={styles.userInfo}>{user.name}</H3>
              </Content>
            }
            </Image>
          <ListItem iconName='contact' bodyText='Perfil' onPress={Actions.profile} />
          <ListItem iconName='school' bodyText='Minhas Monitorias' onPress={Actions.myMonitoring} style={styles.listItem}/>
          <ListItem iconName='contacts' bodyText='Meus Grupos' onPress={Actions.myGroup} style={styles.listItem}/>
          <ListItem iconName='exit' bodyText='Sair' onPress={() => { this.logout() }} style={styles.listItem}/>
        </Content>
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
)(SideMenu);
