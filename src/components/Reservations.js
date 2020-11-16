import React from 'react'
import TextModal from './TextModal'

class Reservations extends React.Component{

  state={
    review:"",
    showTextBox: true,
    ready:false,
    textModal: false,
    convoId: ""
  }

  componentDidMount(){
       console.log("helo")
      setTimeout(this.handleLoading,300);
  }

  handleLoading=()=>{
      this.setState({
          ready:true
      })
  }


   handleInputChange=(evt)=>{
    console.log(evt.target.value)
    this.setState({
      [evt.target.name]: evt.target.value
    })
   }

   handleReviewSubmit=(evt)=>{
     evt.preventDefault()
     this.setState({
       showTextBox: false
     })
     fetch('http://localhost:5000/reviews',{
       method: 'POST',
       headers: {
        "Content-Type": 'Application/json'
    },
    body: JSON.stringify({
      listing_id: evt.target.id,
      user_id: this.props.currentUser.user.id,
      textarea: this.state.review,
      rating:5
     })
    })
    .then(res=>res.json())
    .then((review)=>{
      this.props.updateListing(review)
    })
   }

  createChatRoom=(evt)=>{
    console.log(this.props.currentUser)
    fetch('http://localhost:5000/conversations',{
      method: 'POST',
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        sender_id: this.props.currentUser.user.id,
        receiver_id: this.props.currentUser.user.reservations[0].getListingInfo.user_id
    })
  })
  .then(res=>res.json())
  .then((res)=> {
    this.setState({
      convoId: res.id
    })
  })
  .then(
      fetch(`http://localhost:5000/conversations/${this.props.convoId}`)
          .then(res=>res.json())
          .then(messages => {
                this.setState({
                    messages: messages
                })
          })
  )
  
     this.setState({
       textModal:true
     })
   }

  handleClick=(evt)=>{
    fetch(`http://localhost:5000/reservations/${evt.target.id}`,{
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.token
      }
  })
  .then(res=>res.json())
  .then((reservation)=>{
    this.props.updateUserState(reservation)
    })

  }

closeTextModal=(evt)=>{
  this.setState({
    textModal: false
  })
}


render(){

  let chat="https://res.cloudinary.com/dm3tfsraw/image/upload/v1605143830/icon_awzlmn.png"

 let userReservations
 if(this.state.ready){
    userReservations=this.props.currentUser.user.reservations.map((resv, index)=>{
  return<div className="reserv-cards">
    <div className="row">
     <div key={resv.id} className="card">
       <h2 className="date-text">{new Date(resv.booking_time).toDateString()}</h2>
       <h2 className="time-text">{new Date(resv.booking_time).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</h2>
       <img title="Send Host A Message!" id={resv.listing_id} onClick={this.createChatRoom} className="txt-msg-rsv" src={chat} alt="Message Button"/>
       {/* <button id={resv.listing_id} onClick={this.createChatRoom} type="submit" className="txt-msg-rsv">Contact</button> */}
       <textarea ref={index} className={this.state.showTextBox ? "review-box" : "review-hide"} type="text" name="review" value={this.state.index} onChange={this.handleInputChange} placeholder="Leave a Review!" />
       <button id={resv.listing_id} onClick={this.handleReviewSubmit} type="submit" className={this.state.showTextBox ? "review-btn" : "rvw-btn-hide"}>Submit</button>
       <label className="checkbox-label" for="completed"> CLOSE RESERVATION</label> 
       <input onClick={this.handleClick}className="checkbox" type="checkbox" id={resv.id} name="completed" value="completed"/>
   </div>
   </div>
  </div>
})
 }

     return(
        <div className="reservation-comp">
          <div className="reservations-page">
           <div className="box"></div>
           <h1 className="reserv-banner">Reserv</h1>
           <h1 className="reserv-banner-2">ations</h1>
           {userReservations}
           {this.state.textModal ? <TextModal closeTextModal={this.closeTextModal} convoId={this.state.convoId} currentUser={this.props.currentUser}/> : null}
          </div>
          </div>
      
        )
    }
}

export default Reservations