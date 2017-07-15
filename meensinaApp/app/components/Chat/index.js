import React, { Component } from 'react';
import { Header, Left, Container, Body, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../../actions';
import Button from '../Button';
import { Actions } from 'react-native-router-flux';

const Firebase = require("firebase");

export class Chat extends Component {
  static propTypes = {
    courseId: React.PropTypes.number,
    groupId: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    const { courseId, groupId } = this.props;
    let originPath = undefined;
    if (courseId) {
      originPath = 'course';
    }
    if (groupId) {
      originPath = 'group'
    }
    let sourceChat = courseId || groupId;
    this._messagesRef = new Firebase(`https://meensina-c4b6f.firebaseio.com/messages/${originPath}/${sourceChat}`);
    this._messages = [];
    this.state = {
      messages: this._messages,
      typingMessage: ''
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
    const user = this.props.me;
    this._messagesRef.on('child_added', (child) => {
      this.handleReceive({
        text: child.val().text,
        name: child.val().name,
        email: child.val().email,
        avatar: child.val().avatar,
        createdAt: new Date(child.val().createdAt),
        position: child.val().email == user.email && 'right' || 'left',
        user: {
          _id: child.val().uid,
        },
        _id: child.val().createdAt
      });
    });
  }

  setMessages(messages) {
    this._messages = messages;
    this.setState({
      messages: messages,
    });
  }

  onSend(messages = []) {
    const now = new Date().getTime();
    const user = this.props.me;
    messages.forEach(message => {
      this._messagesRef.push({
        _id: now,
        uid: user.id,
        text: message.text,
        name: user.name,
        avatar: user.picture_url,
        email: user.email,
        date: new Date(),
        createdAt: now,
        order: -1 * now
      })
    });
  }

  handleReceive(message = {}) {
    this.setMessages(this._messages.concat(message));
  }

 render() {
   const user = this.props.me;
   return (
     <Container>
       <Header>
          <Left>
             <Button transparent iconName='arrow-back' onPress={Actions.home} />
          </Left>
          <Body>
            <Title>Chat da sala</Title>
          </Body>
        </Header>
       { user &&
         <GiftedChat
           messages={this.state.messages}
           onSend={this.onSend}
           user={{
             _id: user.id,
           }}
         />
       }
    </Container>
   );
 }
}
const mapStateToProps = (state) => {
  return { me: state.user.me };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
