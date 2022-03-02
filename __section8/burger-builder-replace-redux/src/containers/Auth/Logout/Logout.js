import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as reduxActions from '../../../redux/store/actions/index';

const Logout = props => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout])


  return <Redirect to="/" />;

}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(reduxActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);