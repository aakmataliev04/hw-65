import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="nav">
      <div className="container header-container">
        <NavLink to="/" className="navbar-brand">App</NavLink>
        <ul className={'nav-list'}>
          <li className={'nav-item'}>
            <NavLink
              to="/pages/home"
              className={'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li className={'nav-item'}>
            <NavLink
              to="/pages/products"
              className={'nav-link'}
            >
              Products
            </NavLink>
          </li>

          <li className={'nav-item'}>
            <NavLink
              to="/pages/collections"
              className={'nav-link'}
            >
              Collections
            </NavLink>
          </li>

          <li className={'nav-item'}>
            <NavLink
              to="/pages/about"
              className={'nav-link'}
            >
              About
            </NavLink>
          </li>

          <li className={'nav-item'}>
            <NavLink
              to="/pages/contacts"
              className={'nav-link'}
            >
              Contacts
            </NavLink>
          </li>
          <li className={'nav-item'}>
            <NavLink
              to="/pages/admin"
              className={'nav-link'}
            >
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;