import React from 'react'

import logo from '../img/group.png'

export default class NavBar extends React.Component{

  state= {
    email: this.props.user.email,
    username: this.props.user.username
  }

  updateUsername = (e) => {
    this.setState({username: e.target.value})
  }
  updateEmail = (e) => {
    this.setState({email: e.target.value})
  }

  render(){
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
    <form id="form-edit" onSubmit={(e) => {
      e.preventDefault()
      this.props.editCurrentUser(this.state)}}>
          <div className="navbar-item">
            <input onChange={this.updateUsername} id="input-username" value={this.state.username} />
          </div>
      <div className="navbar-item">
        <input onChange={this.updateEmail} id="input-email" value={this.state.email} />
      </div>
      <div className="navbar-item">
          <button type="submit" className="button is-warning">
            <strong>Submit</strong>
          </button>
        </div>
      </form>
      <div id="form-edit-button"className="navbar-item">
          <button type="submit" className="button is-warning">
            <strong>Edit User</strong>
          </button>
        </div>
      <div className="navbar-item">
        <a onClick={this.props.deleteCurrentUser} className="button is-danger">
          <strong>Delete Account</strong>
        </a>
      </div>
      <div className="navbar-item">
          <a onClick={() => this.props.updateCurrentUser(null)} className="button is-primary">
            <strong>Log Out</strong>
          </a>
      </div>
    </div>
  </div>
</nav>
  )
}
}

