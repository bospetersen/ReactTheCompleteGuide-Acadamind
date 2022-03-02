import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from '../../redux/store/actions/index';

import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sidedrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sidedrawerCloseHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token != null
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     onLogedIn: () => dispatch(reduxActions.someFunctionNotMadeYet())
//   }
// }
export default connect(mapStateToProps)(Layout)
