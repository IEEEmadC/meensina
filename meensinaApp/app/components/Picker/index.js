import React, { Component } from 'react';
import { Picker } from 'react-native';

export default class PickerDefault extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    valueSet: React.PropTypes.string,
  };

  render() {
    return(
      <Picker
        selectedValue={this.state.value}
        onValueChange={(data) => this.setState({ value: data })}>
        <Picker.Item label={this.props.label} value={this.props.valueSet} />
      </Picker>
    );
  }
}
