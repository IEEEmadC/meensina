import React, { Component } from 'react';
import { Content, Header, Title, Left, Right, Body, Input, Item, Icon } from 'native-base';
import Button from '../Button';
import Display from 'react-native-display';

export default class HeaderNav extends Component {
  constructor() {
    super();
    this.state = {
      searchBar: false,
    }
  }

  static propTypes = {
    iconLeft: React.PropTypes.string,
    title: React.PropTypes.string,
    iconRightSearch: React.PropTypes.func,
    iconRightMore: React.PropTypes.string,
    showRightIcon: React.PropTypes.bool,
    searchBar: React.PropTypes.bool,
  };

  render() {
      return (
        <Content>
         {this.props.searchBar ?
            <Header searchBar rounded>
              <Item>
                  <Icon name="search" />
                  <Input placeholder="Search" />
                  <Icon active name="close" onPress={this.props.iconRightSearch} />
              </Item>
            </Header>
            :
            <Header hasTabs noShadow={true}>
              <Left>
                <Button transparent iconName={this.props.iconLeft} onPress={this.props.onPress}/>
              </Left>
              <Body>
                  <Title>{this.props.title}</Title>
              </Body>
              <Display enable={this.props.showRightIcon || false }>
                <Right>
                  <Button transparent iconName='search' onPress={this.props.iconRightSearch}/>
                </Right>
              </Display>
            </Header>
          }
        </Content>
      );
  }
}
