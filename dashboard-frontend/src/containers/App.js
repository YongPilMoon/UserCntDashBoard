import React, { Component } from 'react';
import Chart from '../Components/UserCntChart';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from '../redux/modules/user';
import UserCntTable from '../Components/UserCntTable';

class App extends Component {
  componentDidMount() {
    const { UserActions } = this.props;
    UserActions.getUsers("2017-09-27");
  }

  render() {
    const  users  = this.props.users;
    return (
        <div className="App">
          { users === null ?  "로딩중":  <UserCntTable users={users}/> }
          { users === null ?  "로딩중":  <Chart users={users}/> }
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