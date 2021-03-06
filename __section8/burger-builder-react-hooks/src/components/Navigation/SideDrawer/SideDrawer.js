import React from 'react'
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx';
import classes from './SideDrawer.module.css'

const SideDrawer = (props) => {

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <Logo height="11%" />
        <nav>
          <NavItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  )
}

export default SideDrawer
