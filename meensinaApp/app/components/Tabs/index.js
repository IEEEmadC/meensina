import React, { Component } from 'react';
import { Tabs, Tab, Container } from 'native-base';
import Group from '../../routes/Group';
import Monitoring from '../../routes/Monitoring';

export default class TabsNav extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Monitorias">
            <Monitoring />
          </Tab>
          <Tab heading="Grupos">
            <Group />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
