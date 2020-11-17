import React from 'react'

import {ActionCable} from 'react-actioncable-provider'

class TextModal extends React.Component{
    state={
        messages: [],
        newMessage: ""
       }
   
  componentDidMount(){
       console.log("component mount hit")
        fetch(`https://spot-a-potty.herokuapp.com/conversations/${this.props.convoId}`)
          .then(res=>res.json())
          .then(messages => {
                this.setState({
                    messages: messages
                })
             
          
          })
      }

       
    handleReceivedMessage=(message)=>{
          let copyOfMessages=[...this.state.messages, message]
           this.setState({
               messages: copyOfMessages
           })
       }
       
       
      handleChange=(evt)=>{
          this.setState({
           [evt.target.name]: evt.target.value
          })
      }
       
       handleSubmit=(e)=> {
         e.preventDefault();
         let user_id=this.props.currentUser.user.id
         fetch('https://spot-a-potty.herokuapp.com/messages',{
             method: "POST",
             headers: {
               "Content-Type": "Application/json"
             },
             body: JSON.stringify({
             user_id: user_id,
             content: this.state.newMessage,
             conversation_id: this.props.convoId
         })
       })
         this.setState({
             newMessage: ""
         })
       }

       hideTextModal=(e)=>{
        e.preventDefault()
    
        this.props.closeTextModal()
   
    }
     
    render(){
        console.log(this.props.convoId)
         let  messageArray=this.state.messages.map((mesg)=>{
             return<div className="text-messages">
              {mesg.content ?  <span className="ind-text-user">{mesg.user.name}: </span> : null}
              <span className="ind-text">{mesg.content}</span>
              </div>
           })
        
     
  return(
  <div className="text-modal">
  <h3 className="x-exit-chat" onClick={this.hideTextModal}>X</h3>
     <ActionCable
        channel={{channel:"RoomChannel"}}
        onConnected={this.handleConnected}
        onReceived={this.handleReceivedMessage}
            />
          
          {messageArray}
         <form className="send-msg" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="newMessage"
              value={this.state.newMessage}
              onChange={this.handleChange}
              placeholder="Type message here"
            />
            <input className="text-submit" type="submit" placeholder="send"/>
          
          </form>   
          </div>
        )
    }
}
  export default TextModal