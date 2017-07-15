import React, { Component } from 'react';
import { Form, Item, Label, Input } from 'native-base';

export default class FormDefault extends Component {
  static propTypes = {
    label: React.PropTypes.string,
  };

  render() {
    const { ...props } = this.props;
    return (
      <Form>
        <Item {...props}>
          <Label>{this.props.label}</Label>
          <Input onChangeText={this.props.onChangeText}/>
        </Item>
      </Form>
    );
  }
}
