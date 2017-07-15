import React, { Component } from 'react';
import { ListItem, Left, Icon, Body, Text } from 'native-base';

export default class ListItemDefault extends Component {
  static propTypes = {
    iconName: React.PropTypes.string,
    bodyText: React.PropTypes.string,
  };

  render() {
    return(
      <ListItem icon onPress={this.props.onPress}>
        <Left>
            <Icon name={this.props.iconName} />
        </Left>
        <Body>
          <Text>{this.props.bodyText}</Text>
        </Body>
      </ListItem>
    );
  }
}
