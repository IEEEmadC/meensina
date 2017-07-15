import React, { Component } from 'react';
import Chat from '../../../components/Chat';

export default class ViewGroupChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: this.props.navigationState,
    }
  }
  render() {
    const { groupId } = this.state.group;
    return ( <Chat groupId={groupId} />)
  }
}
