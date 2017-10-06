import React, { Component } from 'react';

import BrandLogo from '../components/header/BrandLogo';
import Menu from '../components/header/Menu';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from '../redux/modules/user';

class Header extends Component{

  handleThisWeekOnClick = () => {
    const { UserActions } = this.props;
    UserActions.getThisWeekUsers();
  };

  handlePreWeekOnClick = () => {
    const { UserActions } = this.props;
    UserActions.getPreWeekUsers()
  };

  handleNextWeekOnClick = () => {
    const { UserActions } = this.props;
    UserActions.getNextWeekUsers()
  };

  render() {
    const { handleThisWeekOnClick, handlePreWeekOnClick, handleNextWeekOnClick } = this;
    return (
        <div>
          <div className="header-wrapper">
            <div className="header">
              <Menu
                  handleThisWeekOnClick={handleThisWeekOnClick}
                  handlePreWeekOnClick={handlePreWeekOnClick}
                  handleNextWeekOnClick={handleNextWeekOnClick}
              />
              <BrandLogo />
            </div>
          </div>
        </div>
    )
  }
}

export default connect(
    state => ({
      untilDate: state.user.getIn(['users', 'untilDate'])
    }),
    dispatch => ({
      UserActions: bindActionCreators(user, dispatch)
    })
)(Header);