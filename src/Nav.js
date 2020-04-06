import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <div className="nav">
      <Link to='/recipes' className="btn nav-link">Recipes</Link>
      <Link to='/about' className="btn nav-link">About</Link>
    </div>
  );
}

export default Nav;