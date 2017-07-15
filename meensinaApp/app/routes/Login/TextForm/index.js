import React, { Component } from 'react';
import { Text } from 'react-native';

export default class TextForm extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <Text style={{ alignItems: 'center' }} note>{this.props.title}</Text>
    )
  }
}
