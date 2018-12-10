import React from 'react'

import logo from '../img/group.png'

const NavBar = (props) => {
  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src={logo} style={{ height: "100%", padding: -20, margin: -1}} />
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="NavBar" className="navbar-menu">
    <div className="navbar-end">
      <div className="navbar-item">
          <a onClick={() => props.updateCurrentUser(null)} className="button is-primary">
            <strong>Log Out</strong>
          </a>
      </div>
    </div>
  </div>
</nav>
  )
}

export default NavBar