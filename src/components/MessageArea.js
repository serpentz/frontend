
import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesArea = (props) => {

  let {chatroom: { id, name, messages }} = props


  const orderedMessages = messages => {
    let sorted = messages.sort((a , b) => new Date(a.created_at) - new Date(b.created_at))
    
  return sorted.map(message => {
       if(props.user.id === message.user.id ){
         return <div key={message.id} className="d-flex justify-content-end mb-5"><div className="msg_cotainer_send" >{message.text} </div> </div>
       }
       else{
         return <div key={message.id} className="d-flex justify-content-start mb-5"><div className="msg_cotainer" >{message.text} <span className="msg_time_send">{message.user.username} </span> </div> </div>
       }
    
  })
}

  return (
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">


          <div className="user_info">
            <span> {name} </span>
            <p> {messages.length} messages </p>
          </div>
        </div>
        </div>
        <div className="card-body msg_card_body">

          {orderedMessages(messages)}
        </div>


        <NewMessageForm conversation_id={id} user={props.user}  />
      </div>
    </div>
    
  );
};

export default MessagesArea;

