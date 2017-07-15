import React, { Component, PropTypes } from 'react';
import { Button, Icon, Text } from 'native-base';

export default class ButtonDefault extends Component {
  static propTypes = {
    iconName: React.PropTypes.string,
    text: React.PropTypes.string,
    badgeValue: React.PropTypes.number,
    badgeColor: React.PropTypes.string,
    transparent: React.PropTypes.bool,
    full: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  };

  render(){
    return (
      <Button
        badgeValue={this.props.badgeValue}
        transparent={this.props.transparent || false }
        badgeColor={this.props.badgeColor}
        onPress={this.props.onPress}
        full={this.props.full}
        disabled={this.props.disabled}
        style={this.props.style}
        >
        <Icon name={this.props.iconName} />
        <Text>{this.props.text}</Text>
      </Button>
    );
  }
}
