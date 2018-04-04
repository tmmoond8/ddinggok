import React from 'react';
import './NavItem.scss';

const NavItem = ({children}) => (
  <div className="nav item">
    {children}
  </div>
);

export default NavItem;