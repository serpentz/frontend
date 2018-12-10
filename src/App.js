
import React, { Component,Fragment } from 'react';
import Login from './components/Login'
import {Route,Switch,Redirect} from 'react-router-dom'

import ChatroomList from './components/ConversationsList';

class App extends Component {

	constructor(){
		super()
		this.state =
		 {
			currentUser: null
		 }
	}

  componentDidMount(){

	    let user = localStorage.getItem('user_id')
	    if(user){
	    	this.setState({
	          currentUser: "user"
	        })
	      fetch(`http://localhost:3000/users/${user}`)
	      .then(res => res.json())
	      .then(data => {
	        this.setState({
	          currentUser: data
	        })
	      })
	  	}
	}


  updateCurrentUser = (user) => {
    this.setState({currentUser: user})
	  if(!user){localStorage.clear()}
  }

  render() {
  	let {currentUser} = this.state
    return (
      <div className="App">
      	<Fragment>
	        <Switch>
	          <Route exact path="/" render={() => <Redirect to="/login" />} />
	          <Route exact path="/chatrooms" render={() => currentUser ?
	            <ChatroomList
					updateCurrentUser={this.updateCurrentUser}
					user={currentUser} /> :
	            <Login updateCurrentUser={this.updateCurrentUser}/>}
	          />
	          <Route exact path="/login" render={() => currentUser ?
	            <Redirect to='/chatrooms'/> :
	            <Login updateCurrentUser={this.updateCurrentUser}/>}
	          />
          
        	</Switch>
        </Fragment>
        
      </div>
    );
  }
}

export default App;