import React from 'react';
import NavnItem from './NavItem/NavnItem';
import classes from './NavItems.module.css';

const NavItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavnItem link="/">Burger Builder</NavnItem>
      {
        props.isAuthenticated
          ? <NavnItem link="/orders">Orders</NavnItem>
          : null
      }
      {
        !props.isAuthenticated
          ? <NavnItem link="/auth">Log In</NavnItem>
          : <NavnItem link="/logout">Log Out</NavnItem>
      }
    </ul>
  )
}

export default NavItems
