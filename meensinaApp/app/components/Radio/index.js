import React, { Component } from 'react';
import { ListItem, Text, Content, Radio, Right } from 'native-base';

export default class RadioDefault extends Component {
  static propTypes = {
    text: React.PropTypes.string,
    selected: React.PropTypes.bool,
  };

  render() {
    return (
      <Content>
        <ListItem selected={this.props.selected} onPress={this.props.onPress}>
          <Text>{this.props.text}</Text>
          <Right>
            <Radio selected={this.props.selected} onPress={this.props.onPress}/>
          </Right>
        </ListItem>
      </Content>
    );
  }
}
