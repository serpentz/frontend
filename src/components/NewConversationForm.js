import React from 'react';
import './custom.css'
import { API_ROOT, HEADERS } from '../constants/constants';

class NewChatroomForm extends React.Component {
  state = {
    name: ''
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/chatrooms`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ name: '' });
  };

  render = () => {
    return (
      <div className="card-header">
            <div className="input-group">
              <textarea 
               className="form-control search"
               type="text"
               value={this.state.name}
               onChange={this.handleChange}
               type="text" placeholder="Search..." name="" className="form-control search"/>
              <div onClick={this.handleSubmit} className="input-group-prepend">
                <span className="input-group-text search_btn"><i className="glyphicon glyphicon-plus"></i></span>
              </div>
            </div>
          </div>
     
    );
  };
}

export default NewChatroomForm;

