import React from 'react'
import { mockComponent } from 'react-dom/test-utils'

class Reservations extends React.Component{

  state={
    reservation:[]
  }

  handleClick=(index)=>{
   this.setState({
     reservation:this.props.currentUser.reservations[index.target.id]
   })

   setTimeout(() => {
     this.makeFetchRequest()
   }, 1000);
  }

  makeFetchRequest=()=>{
    console.log(this.state.reservation)

    fetch(`http://localhost:5000/reservations/${this.state.reservation.id}`,{
      method: 'DELETE',
  })
  .then(res=>res.json())
  .then((updatedUser)=>{
    this.props.updateUserState(updatedUser)
    })
  }

 userReservations=this.props.currentUser.reservations.map((resv, index)=>{
    return<div className="reserv-cards">
      <div className="row">
       <div className="card">
         <h1 className="index-text">{index + 1.}</h1>
         <h2 className="date-text">{new Date(resv.booking_time).toDateString()}</h2>
         <h2 className="time-text">{new Date(resv.booking_time).toLocaleTimeString()}</h2>
        <form  onClick={this.handleClick}>
         <input className="checkbox" type="checkbox" id={index} name="completed" value="completed"/>
         <label className="checkbox-label" for="completed"> Finished?</label> 
     </form>
     </div>
     </div>
    </div>
})

    render(){

      console.log(this.state.reservationList)
    
     return(
        <div className="reservation-comp">
          <div className="reservations-page">
           <div className="box"></div>
           <h1 className="reserv-banner">Reserv</h1>
           <h1 className="reserv-banner-2">ations</h1>
           {this.userReservations}
          </div>
          </div>
      
        )
    }
}

export default Reservations