import React from 'react';
import { Burger } from './Burger';
import { Logo } from './Logo';
import './css/navbar.css';

type NavbarProps = {
  isSidebarActive: boolean;
  setIsSidebarActive: () => void;
};

export const Navbar = (props: NavbarProps) => {
  return (
    <nav className="nav">
      <Burger {...props} />
      <div className="nav__logo">
        <Logo />
      </div>
    </nav>
  );
};

export default Navbar;
