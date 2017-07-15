import React, { Component } from 'react';
import {
  Container,
  Content,
  H3,
  Thumbnail,
  Text,
  Input,
  Item,
  Label,
  Icon,
  Left,
  Button,
  Spinner
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import style from './styles';
import Header from '../../components/Header';
import { fetchUser } from '../../actions';
import imageUpload from './ImageUpload';

const options = {
  title: 'Selecionar Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  cancelButtonTitle: 'Cancelar',
  chooseFromLibraryButtonTitle: 'Imagem da Câmera',
};

export class Profile extends Component {
  static propTypes = {
    userPassword: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.me,
      avatarSource: 'https://goo.gl/Xrs5b0',
      changePassword: false,
      showLoading: false,
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  openMycamera = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        alert('Cancelado');
      } else if (response.error) {
        alert('Ocorreu um erro!');
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri
        };
        const { token } = this.props.me;
        this.submitImage(source, token);
        this.setState({
          showLoading: true,
        })
      }
    });
  };

  submitImage(source, token) {
    imageUpload(source, token).then((uploaded) => {
      if (uploaded) {
        const { user } = this.state;
        user.picture_url = uploaded;
        this.setState({
          showLoading: false,
          user,
        });
      }
    });
  }

  saveProfile() {
    alert('Perfil salvo com sucesso!');
  }

  render() {
    const { user } = this.state;
    return (
      <Container>
        { user ? (
        <Content>
        <Header iconLeft='arrow-back' onPress={Actions.home}/>
          <Content style={style.content}>
            <Content contentContainerStyle={style.userImage}>
              { this.state.showLoading &&
                <Spinner color='blue' />
              }
              <Thumbnail size={120} source={{ uri: user.picture_url || this.state.avatarSource }} style={{ zIndex:1 }} />
              <Icon name='camera' style={style.uploadImage} onPress={this.openMycamera}/>
              <H3 style={style.userInfo}>{user.name}</H3>
            </Content>
          </Content>
          <Content style={{ margin: 16 }}>
              <Item inlineLabel>
                 <Label>Email</Label>
                 <Input value={user.email} editable={false} />
             </Item>
             { user.password &&
              <Item inlineLabel>
                 <Label>Senha</Label>
                 <Input value={user.password} editable={false} secureTextEntry maxLength={10}/>
              </Item>
              }
            <Left>
              <Button style={style.saveProfileButton} onPress={() => this.saveProfile()}>
                <Text>
                  Salvar perfil
                </Text>
              </Button>
            </Left>
          </Content>
        </Content>
      ) : (
        <Content>
          <Spinner color='blue' />
        </Content>
      )}
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
)(Profile);
