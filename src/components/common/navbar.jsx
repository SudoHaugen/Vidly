/**@format */

import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ itemList }) => {
  let navItems = itemList.slice(1);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        {itemList[0]}
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li className="nav-item">
              <NavLink className="nav-link" to={`/${item.toLowerCase()}`}>
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
