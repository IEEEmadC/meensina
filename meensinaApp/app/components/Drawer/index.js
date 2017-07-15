import React, { Component } from 'react';
import { Drawer, SideBar } from 'native-base';
import Container from '../Container';
import SideMenu from '../SideMenu';

export default class DrawerDefault extends Component {
  render() {
    closeDrawer = () => {
      this._drawer._root.close()
    };
    openDrawer = () => {
      this._drawer._root.open()
    };
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideMenu closeDrawer={closeDrawer} />}
        onClose={() => closeDrawer()}
      >
      <Container />
    </Drawer>
    );
  }
}
