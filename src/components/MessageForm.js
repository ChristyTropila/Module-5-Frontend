import React from 'react'
import {ActionCable} from 'react-actioncable-provider'

class MessageForm extends React.Component {
   
    state={
     messages: [],
     newMessage: ""
    }

    componentDidMount(){
   
        fetch('http://localhost:5000/messages')
        .then(res=>res.json())
        .then(messages => {
            this.setState({ 
             messages: messages
            })
        })
    }

    handleReceivedMessage=(message)=>{
     debugger;
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
      fetch('http://localhost:5000/messages',{
          method: "POST",
          headers: {
            "Content-Type": "Application/json"
          },
          body: JSON.stringify({
          user_id: user_id,
          content: this.state.newMessage,
          conversation_id: this.props.currentUser.user.listings[0].id
      })
    })
      this.setState({
          newMessage: ""
      })
    }
  
    // handleConnected=()=>{
    //   console.log("heloo")
    // }
    
    render() {
  
        let messageArray=this.state.messages.map((mesg)=>{
     
            return<div key={mesg.id}>
                <h1>{mesg.content}</h1>
                <h2>Sender: {mesg.user.name}</h2>
            </div>
        })
 return (
 
     <div>
       {/* <ActionCable
        channel={{channel:"RoomChannel"}}
        onConnected={this.handleConnected}
        onReceived={this.handleReceivedMessage}
            />
          {messageArray}
         <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="newMessage"
              value={this.state.newMessage}
              onChange={this.handleChange}
              placeholder="Type message here"
            />
            <input type="submit"/>
          
          </form>   
        */}
       
          {/* <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="Type message here"
            />
            <input type="submit" />
          </form> */}
        </div>
   
      );
    }
  }
  
  export default MessageForm