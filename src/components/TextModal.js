import React from 'react'
import {ActionCable} from 'react-actioncable-provider'



class TextModal extends React.Component{
    state={
        messages: [],
        newMessage: ""
       }
   
  componentDidMount(){
        fetch(`http://localhost:5000/conversations/${this.props.convoId}`)
          .then(res=>res.json())
          .then(messages => {
            this.setState({
                messages: messages.messages
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
     
   

    render(){
        console.log(this.state.messages)
        
        // if(this.state.messages.length > 0){
        //     let messageArray=this.state.messages.map((mesg)=>{
        //         debugger;
        //    })
        // }
     
  return(
  <div className="text-modal">
     <ActionCable
        channel={{channel:"RoomChannel"}}
        onConnected={this.handleConnected}
        onReceived={this.handleReceivedMessage}
            />
          {/* {messageArray} */}
         <form className="send-msg" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="newMessage"
              value={this.state.newMessage}
              onChange={this.handleChange}
              placeholder="Type message here"
            />
            <input type="submit"/>
          
          </form>   
          </div>
        )
    }
}
  export default TextModal