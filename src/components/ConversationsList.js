import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants/constants';
import NewConversationForm from './NewConversationForm';
import './custom.css'
import Nav from './NavBar'

import MessageArea from './MessageArea';
import Cable from './Cables';

class ChatroomsList extends React.Component {
  state = {
    chatrooms: [],
    activeChatroom: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/chatrooms`)
      .then(res => res.json())
      .then(chatrooms => this.setState({ chatrooms }));
  };

  handleClick = id => {
    this.setState({ activeChatroom: id });
  };

  handleReceivedConversation = response => {
    console.log(response)
    const { chatroom } = response;
    this.setState({
      chatrooms: [...this.state.chatrooms, chatroom]
    });
  };

  handleReceivedMessage = response => {

    const { message } = response;
    const chatrooms = [...this.state.chatrooms];
    const newChatrooms = chatrooms.map(
      chatroom => {
        if(chatroom.id === message.chatroom.id){
              chatroom.messages = [...chatroom.messages, message];
              return chatroom
        }else{
          return chatroom
        }

      }
    );

    this.setState({ chatrooms: newChatrooms });
  };

  render = () => {
    const { chatrooms, activeChatroom } = this.state;

    return (
      <React.Fragment>
        <Nav updateCurrentUser={this.props.updateCurrentUser}/>
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <ActionCable
            channel={{ channel: 'ChatroomsChannel' }}
            onReceived={this.handleReceivedConversation}
            />
            {this.state.chatrooms.length ? (
            <Cable
            chatrooms={chatrooms}
            handleReceivedMessage={this.handleReceivedMessage}
            />
            ) : null}

            <div className="col-md-7 col-xl-3 chat">
              <div className="card mb-sm-5 mb-md-1 contacts_card">
                <NewConversationForm />
                <div className="card-body contacts_body"> 
                  <ul className="contacts">
                    {mapChatrooms(chatrooms, this.handleClick)} 
                  </ul>
                </div>
                

                </div>
              </div>

            {activeChatroom ? (
            <MessageArea
            chatroom={findActiveConversation(chatrooms,activeChatroom)}
            user={this.props.user}
            />
            ) : null}

          </div>
        </div>
      </React.Fragment>
    );
  };
}

export default ChatroomsList;



const findActiveConversation = (chatrooms, activeConversation) => {
  return chatrooms.find(
    conversation => conversation.id === activeConversation
  );
};

const mapChatrooms = (chatrooms, handleClick) => {
  return chatrooms.map(conversation => {

    return (
    <li>
    
      <div className='d-flex bd-highlight' key={conversation.id}  onClick={() => handleClick(conversation.id)}>
                            
<div className="img_cont">
      <img src={conversation.image_url} className="rounded-circle user_img"/>
      </div>
      <div className="user_info"> <span>{conversation.name}</span> <br/><p>{conversation.messages[-1]?conversation.messages[-1]: "Nothing"}</p></div>
      
      </div>
      </li>
    );
  });
};