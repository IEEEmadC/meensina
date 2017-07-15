import React, { Component } from 'react';
import { Content, Text, Body, Thumbnail, Left, ListItem, Right, Icon } from 'native-base';
import Display from 'react-native-display';

export default class List extends Component {
  static propTypes = {
    imagePath: React.PropTypes.string,
    title: React.PropTypes.string,
    subtitleName: React.PropTypes.string,
    subtitleLocal: React.PropTypes.string,
    courseId: React.PropTypes.number,
    groupId: React.PropTypes.number,
    avatar: React.PropTypes.bool,
    sizeImage: React.PropTypes.number,
    showSubtitle: React.PropTypes.bool,
    colorFavorite: React.PropTypes.string,
    showFavorite: React.PropTypes.bool,
    note: React.PropTypes.bool,
    userAvatar: React.PropTypes.string,
  };

  render() {
    return (
      <Content>
        <ListItem avatar onPress={this.props.onPress}>
          <Left>
            <Thumbnail size={this.props.sizeImage} source={{ uri: this.props.userAvatar }} style={{ zIndex:1 }} />
          </Left>
          <Body>
              <Text note={this.props.note} numberOfLines={1}>{this.props.title}</Text>
              <Display enable={this.props.showSubtitle || false }>
                <Text note numberOfLines={1}>{this.props.subtitleName}</Text>
                <Text note numberOfLines={1}>{this.props.subtitleLocal}</Text>
              </Display>
          </Body>
          <Display enable={this.props.showFavorite || false }>
            <Right>
              <Icon name='heart' style={{ color: this.props.colorFavorite }} />
            </Right>
          </Display>
        </ListItem>
      </Content>
    );
  }
}
