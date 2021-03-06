import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as reduxActions from '../../../redux/store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(reduxActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);