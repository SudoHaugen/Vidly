import React from 'react';

const NavBar = ({total}) => {
    return (
      <nav className="navbar navbar-light bg-light">
        <h5>Showing {total} movies in the database</h5>
      </nav>
    );
}

export default NavBar;