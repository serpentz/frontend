import React, {Component} from "react";
import { API_ROOT } from '../constants/constants';

import image from '../img/group.png'


export default class Login extends Component {

  constructor(props) {
    super(props);
     

    this.state = {
      email: '',
      password: '',
      password_2: '',
      username: "",
      registerClicked: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let username = this.state.username
    let password = this.state.password

    if (!username || !password){ 
    	return
    }else{
    	this.sendUserData(username,password)
    }

    
  }

  sendUserData(username,password){
  	let body = {user: {username: username, password: password}}
  	let options = {
  		method:"POST",
  		headers: {
  			 "Content-Type": "application/json",
  			 "Accept":"application/json"
  		},	
  		body: JSON.stringify(body)
  	}

  	fetch(`${API_ROOT}user/login`,options)
  	.then(resp => resp.json())
  	.then(json => this.handleLoginResponse(json))
  }

  handleLoginResponse(data){
  	data.id ? this.handleUserData(data) : this.handleUserErrorData(data)
  }

  handleUserData = (data) =>{
    localStorage.setItem("user_id", data.id)
    this.props.updateCurrentUser(data)
  	alert("logged in with the email  => " + data.email)
  }
   handleUserErrorData(data){
  	console.log(data)
  }


  toogleForm = () =>{
  	let newVal = !this.state.registerClicked
  	this.setState({ registerClicked: newVal})

  }

  handleRegisterSubmit = (e)=> {

  	e.preventDefault()
  	  	
  	let username = this.state.username
  	let email = this.state.email
    let password = this.state.password
    let password_2 = this.state.password_2



    if ((!username ||  !email || !password || !password_2) && password != password_2){ 
    	return
    }else{
    	this.sendUserRegisterData(username,email,password)
    }


  }
  sendUserRegisterData(username,email, password){
  	let body = {
  				user: 
  					{
  						username: username,
  					    password: password, 
  					    email: email
  					}
  				}
  	let options = {
  		method:"POST",
  		 headers: {
  			"Content-Type": "application/json",
  			"Accept": "application/json"
  		},
  		body: JSON.stringify(body)
  	}

  	   

  	fetch(`${API_ROOT}/users`, options)
  	.then(resp => resp.json())
  	.then(json =>  this.handleResopnse(json))

  }

  handleResopnse(data){
  		data.id ? this.toogleForm() : this.handleErrorResponse(data)
  }

  handleErrorResponse(data){
  	console.log(data)
  }

  renderRegister(){
  	return (
  		<div className="container has-text-centered">
				<div className="column is-4 is-offset-4">
					<h3 className="title has-text-grey">Register</h3>
					<p className="subtitle has-text-grey">Please Sign Up </p>
					<div className="box">
						<figure className="avatar" style={{width:"50%",height:"50%", margin:"auto"}}>
							<img src={image}/>
						</figure>
						<form onSubmit={this.handleRegisterSubmit}>
							<div className="field">
								<div className="control">
									<input id="email" name="email" className="input is-medium" type="email" onChange={this.handleChange} placeholder="Email" autofocus=""/>
								</div>
							</div>
							<div className="field">
								<div className="control">
									<input id="username" name="username" className="input is-medium" type="text" onChange={this.handleChange} placeholder="Username" autofocus=""/>
								</div>
							</div>
							<div className="field">
								<div className="control">
									<input id="password" name="password" className="input is-medium" type="password" onChange={this.handleChange}  placeholder="Password"/>
								</div>
							</div>
							<div className="field">
								<div className="control">
									<input id="password_2" name="password_2" className="input is-medium" type="password" onChange={this.handleChange}  placeholder="Re-enter Password"/>
								</div>
							</div>
							<button type="submit" className="button is-block is-info is-large is-fullwidth">Register</button>
						</form>
					</div>
					<p className="has-text-grey">
						<span href="#" onClick={this.toogleForm}>Back</span>
					</p>
				</div>
			</div>
	)
  }

  renderLogin(){
  	return (
  		<div className="container has-text-centered">
				<div className="column is-4 is-offset-4">
					<h3 className="title has-text-grey">Login</h3>
					<p className="subtitle has-text-grey">Please login to proceed.</p>
					<div className="box">
						<figure className="avatar" style={{width:"50%",height:"50%", margin:"auto"}}>
							<img src={image}/>
						</figure>
						<form onSubmit={this.handleSubmit}>
							<div className="field">
								<div className="control">
									<input id="username" name="username" className="input is-medium" type="text" onChange={this.handleChange} placeholder="username" />
								</div>
							</div>
							<div className="field">
								<div className="control">
									<input id="password" name="password" className="input is-medium" type="password" onChange={this.handleChange}  placeholder="Password"/>
								</div>
							</div>
							<div className="field">
								<label className="checkbox">
									<input type="checkbox"/> Remember me
								</label>
							</div>
							<button type="submit" className="button is-block is-info is-large is-fullwidth">Login</button>
						</form>
					</div>
					<p className="has-text-grey">
						<span href="#" onClick={this.toogleForm}>Sign Up</span> &nbsp;·&nbsp;
						<span href="#" onClick={this.handleForgetPassword}>Forgot Password</span> &nbsp;·&nbsp;
						<span href="#" onClick={this.handleNeedHelp}>Need Help?</span>
					</p>
				</div>
			</div>
)
  }


  renderForm(bool){
  	return !bool ? this.renderLogin() : this.renderRegister()
  }
  render() {
    return this.renderForm(this.state.registerClicked)
  }
}


