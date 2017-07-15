import React, { Component } from 'react';
import {
  Thumbnail,
  Content,
  Body,
  Left,
  Icon,
  Text,
  H1,
} from 'native-base';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

export default class ContentUser extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    subtitleName: React.PropTypes.string,
    subtitleLocal: React.PropTypes.string,
    days: React.PropTypes.string,
    beginHour: React.PropTypes.string,
    userAvatar: React.PropTypes.string,
  }

  render() {
    return (
      <Content style={{ top: 10, marginBottom: 10 }}>
        <Left>
          <Thumbnail size={120} source={{ uri: this.props.userAvatar }} style={{ zIndex:1 }} />
        </Left>
        <Body style={{ margin: 10 }}>
            <H1 numberOfLines={1}>{this.props.title}</H1>
            <Text numberOfLines={1}>{this.props.subtitleName}</Text>
            <Text numberOfLines={1}>{this.props.subtitleLocal}</Text>
            <Text><Icon name='time' style={{ fontSize: 15 }}/> {this.props.beginHour}</Text>
            <Text numberOfLines={1}>{this.props.days}</Text>
        </Body>
      </Content>
    );
  }
}
