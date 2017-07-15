import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Right, Icon, Body } from 'native-base';
import { Alert } from 'react-native';
import Api from '../../config/axios';
import Header from '../../components/Header';
import { Actions } from 'react-native-router-flux';

export default class MyMonitoring extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    }
  }
  componentDidMount() {
    Api.get('/student/course').then((response) => {
      const courses = response.data;
      this.setState({ courses });
    }).catch(() => {
      Alert.alert('Ops, ocorreu algum erro!', 'Por favor tente novamente mais tarde.')
    })
  }

  render() {
    const { courses } = this.state;
    return(
      <Container>
        <Content>
          <Header iconLeft='arrow-back' onPress={Actions.home}/>
          <List>
            {courses.map(courseInfo => (
              <ListItem key={courseInfo.course_id} onPress={() => Actions.viewRoom({ courseId: courseInfo.course_id })}>
                <Body>
                <Text>{courseInfo.course.discipline}</Text>
                <Text>Monitor: {courseInfo.course.user.name}</Text>
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
