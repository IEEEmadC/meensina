import React, { Component } from 'react';
import Chat from '../../../components/Chat';

export default class ViewRoomChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: this.props.navigationState,
    }
  }
  render() {
    const { courseId } = this.state.course;
    return ( <Chat courseId={courseId} />)
  }
}
