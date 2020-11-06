import React from 'react'
import MessageForm from "./MessageForm"


class ChatRoom extends React.Component{

//  state={
//      conversation:{
//          messages: [],
//          user_id : []
//      }
//  }   


// componentDidMount(){ 
// const cable=ActionCable.createConsumer('ws://localhost:5000/cable')
//  cable.subscriptions.create({
//      channel: "RoomChannel"}, 
//      {
//      received: data=>{
//          this.setState({
//              conversation:{
//                  messages: this.state.messages.concat(data.message),
//                  user_id: data.user_id
//              }
//          })
//         },
//          speak: function(data){
//              return this.perform("speak",data)

//          }
//      })
//  }
 
  


    render(){

        return(
            <div>
                <MessageForm cableApp={this.props.cableApp} currentUser={this.props.currentUser} />

            </div>
        )
    }
}
export default ChatRoom

