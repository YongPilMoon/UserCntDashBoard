import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from '../redux/modules/user';

class App extends Component {
  componentDidMount() {
    const { UserActions } = this.props;
    UserActions.getUsers("2017-09-17", "2017-09-20");
  }

  render() {
    const  users  = this.props;
    return (
        <div className="App">
          { users === null ?  "로딩중": JSON.stringify(users) }
        </div>
    );
  }
}

export default connect(
    state => ({
      users: state.user.getIn(['users','data'])
    }),
    dispatch => ({
      UserActions: bindActionCreators(user, dispatch)
    })
)(App);