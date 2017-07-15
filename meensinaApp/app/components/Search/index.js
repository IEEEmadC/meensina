import React, { Component } from 'react';
import { Content, Text, Header, Item, Icon, Input, Left } from 'native-base';
import Button from '../Button';

export default class Search extends Component {
  render() {
    return(
      <Content>
        <Header searchBar rounded>
        <Left>
          <Button transparent iconName='arrow-back' onPress={this.props.onPress}/>
        </Left>
          <Item>
              <Icon name="search" />
              <Input placeholder="Search" />
          </Item>
          <Button transparent>
              <Text>Search</Text>
          </Button>
        </Header>
      </Content>
    )
  }
};
