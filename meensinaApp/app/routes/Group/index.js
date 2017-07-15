import React, { Component }  from 'react';
import { Actions } from 'react-native-router-flux';
import { RefreshControl } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups } from '../../actions';
import List from '../../components/List';

export class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 10
    }
  }

  componentDidMount() {
    const { limit } = this.state;
    this.props.fetchGroups(limit);
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
      limit: 10
    });
    let { limit } = this.state;
    this.props.fetchGroups(limit);
  }

  render() {
    const groups = this.props.groups || [];
    return(
      <Content style={{ marginBottom: 50 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
        >
        {groups.map(group => (
          <List
            title={group.name}
            subtitleName={group.user.name}
            subtitleLocal={group.local}
            userAvatar={group.avatar_url || 'https://goo.gl/Qn2hxg' }
            sizeImage={55}
            key={group.id}
            groupId={group.id}
            showFavorite={false}
            showSubtitle={true}
            onPress={() => Actions.viewGroup({ groupId: group.id })}
          />
        ))}
      </Content>
    );
  }
}
const mapStateToProps = (state) => {
  return { groups: state.groups.all };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGroups }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Group);
