import React, { Component } from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {
  Home,
  Login,
  Register,
  PreviewLogin,
  ViewRoom,
  ViewRoomChat,
  ViewGroup,
  ViewGroupChat,
  Create,
  GroupCreate,
  RoomCreate,
  Profile,
  ChangePassword,
  Search,
  MyMonitoring,
  MyGroup,
} from '../routes';

// create application state
const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class RouterView extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="preview" component={PreviewLogin} title="PreviewLogin" type={ActionConst.RESET}/>
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="register" component={Register} title="Register"/>
            <Scene key="home" component={Home} type={ActionConst.RESET} />
            <Scene key="viewRoom" component={ViewRoom}/>
            <Scene key="viewRoomChat" component={ViewRoomChat}/>
            <Scene key="viewGroup" component={ViewGroup}/>
            <Scene key="viewGroupChat" component={ViewGroupChat}/>
            <Scene key="studyCreate" component={Create}/>
            <Scene key="roomCreate" component={RoomCreate}/>
            <Scene key="groupCreate" component={GroupCreate}/>
            <Scene key="profile" component={Profile}/>
            <Scene key="changePassword" component={ChangePassword}/>
            <Scene key="search" component={Search}/>
            <Scene key="myMonitoring" component={MyMonitoring}/>
            <Scene key="myGroup" component={MyGroup}/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}
