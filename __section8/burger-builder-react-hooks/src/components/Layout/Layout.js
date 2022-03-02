import React, { useState } from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from '../../redux/store/actions/index';

import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [drawerVisability, setDrawerVisability] = useState(false);

  const sidedrawerCloseHandler = () => {
    // this.setState({ showSideDrawer: false })
    setDrawerVisability(false);
  }

  const sideDrawerToggleHandler = () => {
    setDrawerVisability(!drawerVisability);
  }


  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={drawerVisability}
        closed={sidedrawerCloseHandler}
      />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )

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
