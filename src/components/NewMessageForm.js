
import React from 'react';
import './custom.css'
import { API_ROOT, HEADERS } from '../constants/constants';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    chatroom_id: this.props.conversation_id,
    user_id: this.props.user.id 
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
    this.setState({chatroom_id:this.props.conversation_id })
  };

  handleSubmit = e => {
    e.preventDefault()

    fetch(`${API_ROOT}messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({message: this.state})
    });
    
    this.setState({ text: '' });
  };

  render = () => {

    return (
      <div className="card-footer">
          <div className="input-group">
                <input
                    type="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  className="form-control type_msg" 
                  placeholder="Type your message..."/>
                <div className="input-group-append">
                  <span onClick={this.handleSubmit} className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
                </div>
              </div>
          </div>
     
    );
  };
}

export default NewMessageForm;


