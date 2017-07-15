import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { Tabs, Header, Fab } from '../';

export default class ContainerBody extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      show: false,
    }
  }
  static contextTypes = {
     drawer: React.PropTypes.object.isRequired,
   };

  openSearch = () => {
    if (this.state.show) {
      this.setState({ show: false });
    }
    else {
      this.setState({ show: true });
    }
  };

  render() {
    return (
      <Container>
        <Content scrollEnabled={false}>
          <Header
            iconLeft='menu'
            title='MeEnsina'
            iconRightMore='more'
            iconRightSearch={this.openSearch}
            searchBar={this.state.show}
            showRightIcon
            onPress={this.context.drawer.open}
          />
          <Tabs/>
        </Content>
        <Fab />
      </Container>
    )
  }
};
