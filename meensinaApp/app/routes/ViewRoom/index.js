import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Icon, Footer, FooterTab, Spinner } from 'native-base';
import { View, Alert, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Hr from 'react-native-hr';
import ContentUser from './Content';
import Button from '../../components/Button';
import List from '../../components/List';
import Api from '../../config/axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../actions';
import { findWhere } from 'underscore';

export class ViewRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.navigationState,
      heartFavorite: false,
      heartColor: '#BDBDBD',
      courseInfo: [],
      courseUsers: [],
      exitCourse: false,
      hideChat: false,
    };
  }

  componentWillMount() {
    this.props.fetchUser();
    const courseId = this.state.course.courseId;
    Api.get(`/course/${courseId}`).then(course => {
      const courseInfo = course.data[0];
      console.log(courseInfo);
      this.setState({ courseInfo, courseUsers: courseInfo.courseUsers });
      this.checkUserExists();
    }).catch(() => alert('Ocorreu algum erro.'));
  }

  joinRoom() {
    Alert.alert(
      'Participar da aula',
      'Ao confirmar, você poderá interagir com outros participantes.',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          const courseId = this.state.course.courseId;
          Api.post(`/course/${courseId}`).then(() => {
            const userInfo = { user: this.props.me }
            this.setState({
              courseUsers: this.state.courseUsers.concat(userInfo),
              userExists: true, hideChat:
              false
            });
          }).catch(() => Alert.alert('Ops! Ocorreu um erro.', 'Você já está participando da aula'));
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
    // Check if user is admin or student in course
    const { courseUsers, courseInfo } = this.state;
    const user = this.props.me;
    const users = [];
    courseUsers.map((userData) => {
      users.push(userData.user);
      const userExists = findWhere(users, { id: user.id });
      if (!userExists) {
        this.setState({
          exitCourse: false,
          hideChat: true
        })
      }
    })
    const admin = courseInfo.courseData;
    if (admin.user.id === user.id) {
      this.setState({
        exitCourse: true,
      })
    }
  }

  exitRoom() {
    const courseId = this.state.course.courseId;
    Api.post(`/course/exit/${courseId}`).then(() =>
      Alert.alert('Sucesso!', 'Você não está mais participando desta aula')).catch(() => {
      Alert.alert('Ops, ocorreu um erro.', 'Por favor, tente novamente.')
    })
  }

  render() {
    const { courseInfo, courseUsers, exitCourse, hideChat } = this.state;
    const course = courseInfo.courseData;
    return (
      <Container>
        <Header>
           <Left>
              <Button transparent iconName='arrow-back' onPress={Actions.home} />
           </Left>
         </Header>
         {course ? (
           <Content>
              <ContentUser
              title={course.discipline}
              subtitleName={course.user.name}
              subtitleLocal={course.address}
              studentsTotal={course.students_total}
              studentsNumber={course.students_number}
              beginDate={course.begin_date}
              endDate={course.end_date}
              userAvatar={course.user.picture_url}
              />
              <Hr lineColor='#B9B8B8'/>
              {courseUsers.map((userData) =>
                <List
                  avatar
                  title={userData.user.name}
                  userAvatar={userData.user.picture_url}
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
            {exitCourse ? (
              <Button iconName='md-exit' text='Sair' onPress={() => this.exitRoom()}/>
            ) : (
              <Button iconName='contacts' text='Participar' onPress={() => this.joinRoom()}/>
            )}
            { !hideChat && (
              <Button iconName='chatboxes' text='Chat' onPress={() => Actions.viewRoomChat({ courseId: course.id })} />
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
)(ViewRoom);
