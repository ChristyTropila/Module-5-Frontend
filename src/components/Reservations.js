import React from 'react'
import { mockComponent } from 'react-dom/test-utils'

class Reservations extends React.Component{

  state={
    review:"",
    showTextBox: true,
    ready:false
  }

  componentDidMount(){
      setTimeout(this.handleLoading, 300);
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
  render(){
let userReservations

 if(this.state.ready){
    userReservations=this.props.currentUser.user.reservations.map((resv, index)=>{
 
  return<div className="reserv-cards">
    <div className="row">
     <div key={resv.id} className="card">
       <h2 className="date-text">{new Date(resv.booking_time).toDateString()}</h2>
       <h2 className="time-text">{new Date(resv.booking_time).toLocaleTimeString()}</h2>
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
          </div>
          </div>
      
        )
    }
}

export default Reservations