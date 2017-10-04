import React, { Component } from 'react';
import Chart from '../components/UserCntChart';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from '../redux/modules/user';
import UserCntTable from '../components/UserCntTable';
import Container from '../components/Container';

class App extends Component {
  componentDidMount() {
    const { UserActions } = this.props;
    UserActions.getUsers("2017-09-27");
  }

  render() {
    const  users  = this.props.users;
    return (
        <div className="App">
          <Container>
            { users === null ?  "로딩중":  <Chart users={users}/> }
            { users === null ?  "로딩중":  <UserCntTable users={users}/> }
          </Container>
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