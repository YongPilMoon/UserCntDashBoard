import React, { Component } from 'react';
import Chart from '../components/UserCntChart';
import UserCntTable from '../components/UserCntTable';
import Container from '../components/Container';
import Header from '../containers/Header';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from '../redux/modules/user';

class App extends Component {
  componentDidMount() {
    const { UserActions, untilDate } = this.props;
    UserActions.getUsers(untilDate);
  }

  //props가 변환될 때 이전 untilDate값과 새로운 untilDate값이 같지 않으면 새로운 유저 데이터를 가져 옵니다.
  componentWillReceiveProps(nextProps) {
    const { UserActions } = this.props;
    if(this.props.untilDate !== nextProps.untilDate) {
      UserActions.getUsers(nextProps.untilDate);
    }
  }

  render() {
    const  users  = this.props.users;
    return (
        <div className="App">
          <Header/>
          <Container>
            { users === null ?  null :  <Chart users={users}/> }
            { users === null ?  null :  <UserCntTable users={users}/> }
          </Container>
        </div>
    );
  }
}

export default connect(
    state => ({
      users: state.user.getIn(['users','data']),
      untilDate: state.user.getIn(['users', 'untilDate'])
    }),
    dispatch => ({
      UserActions: bindActionCreators(user, dispatch)
    })
)(App);