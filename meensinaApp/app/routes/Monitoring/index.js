import React, { Component }  from 'react';
import { Actions } from 'react-native-router-flux';
import { RefreshControl, Image } from 'react-native';
import { Content, H3 } from 'native-base';
import Api from '../../config/axios';
import List from '../../components/List';

export default class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesData: [],
      refreshing: false,
      limit: 20,
    }
  }

  fetchData(limit) {
    Api.get(`/courses?limit=${limit}`).then((response) => {
      this.setState({
        coursesData: response.data,
        refreshing: false
      });
    }).catch(() => alert('Ocorreu um erro!'));
  }

  componentDidMount() {
    const { limit } = this.state;
    this.fetchData(limit);
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
      limit: this.state.limit + 5,
    }, () => {
      this.fetchData(this.state.limit);
    });
  }

  render() {
    const courses = this.state.coursesData || [];
    return(
      <Content style={{ marginBottom: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
        >
        {courses.map(course => (
          <List
            title={course.discipline}
            subtitleName={course.user.name}
            subtitleLocal={course.address}
            userAvatar={course.user.picture_url || 'https://goo.gl/Xrs5b0' }
            sizeImage={55}
            key={course.id}
            courseId={course.id}
            showFavorite={false}
            showSubtitle={true}
            onPress={() => Actions.viewRoom({ courseId: course.id })}
          />
        ))}
        {courses.length === 0 &&
          <Content>
            <H3 style={{ padding: 30 }}>Opa! Ainda não possuimos nenhuma monitoria. Que tal iniciar uma agora mesmo? </H3>
            <Image
              style={{ marginLeft: 30, marginTop: 30 }}
              source={require('../../images/arrow.png')}
            />
          </Content>
        }
      </Content>
    )
  }
}
