import React from 'react';
import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavnItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavnItem
