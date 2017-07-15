import React, { Component } from 'react';
import {
  Thumbnail,
  Content,
  Right,
  Body,
  Grid,
  Left,
  Icon,
  Text,
  H1,
} from 'native-base';
import moment from 'moment';
import momentDuration from 'moment-duration-format';


export default class ContentUser extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    subtitleName: React.PropTypes.string,
    subtitleLocal: React.PropTypes.string,
    studentsTotal: React.PropTypes.number,
    studentsNumber: React.PropTypes.number,
    beginDate: React.PropTypes.string,
    endDate: React.PropTypes.string,
    userAvatar: React.PropTypes.string,
  };

  render() {
    const { beginDate, endDate, studentsTotal, studentsNumber } = this.props;
    const durationBegin = moment(beginDate);
    const durationEnd = moment(endDate);
    const duration = moment.duration(durationEnd.diff(durationBegin, 'second'), 'seconds').format('h [h]:mm [min]');
    const date = moment(beginDate).utc().format('HH:mm - DD/MM/YYYY');
    const vacancyCount = studentsTotal - studentsNumber;
    return (
      <Content style={{ top: 10, marginBottom: 10 }}>
        <Left>
          <Thumbnail size={120} source={{ uri: this.props.userAvatar }} style={{ zIndex:1 }} />
        </Left>
        <Body style={{ margin: 10 }}>
            <H1 numberOfLines={1}>{this.props.title}</H1>
            <Text numberOfLines={1}>{this.props.subtitleName}</Text>
            <Text numberOfLines={1}>{this.props.subtitleLocal}</Text>
            <Text><Icon name='time' style={{ fontSize: 15 }}/> {date} | Duração: {duration} </Text>
            <Grid>
              <Right>
                <Text>{this.props.studentsNumber - 1} Alunos</Text>
              </Right>
              <Icon name='remove' style={{ margin: 16 }} />
              <Left>
                <Text>{vacancyCount + 1} Vagas</Text>
              </Left>
            </Grid>
        </Body>
      </Content>
    );
  }
}
