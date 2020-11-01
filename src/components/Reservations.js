import React from 'react'
import { mockComponent } from 'react-dom/test-utils'

class Reservations extends React.Component{

  // state={
  //   reservation:[]
  // }

  // componentDidMount(){
  //   this.setState({
  //     reservation: this.props.currentUser.reservations
  //   })
  // }

  handleClick=(evt)=>{
    debugger;
    fetch(`http://localhost:5000/reservations/${evt.target.id}`,{
      method: 'DELETE',
  })
  .then(res=>res.json())
  .then((reservation)=>{
    console.log(reservation)
    this.props.updateUserState(reservation)
    })

  }

    render(){
      console.log(this.props.currentUser)
      console.log(this.props.currentUser.reservations)
    
 let userReservations=this.props.currentUser.reservations.map((resv, index)=>{
  return<div className="reserv-cards">
    <div className="row">
     <div key={resv.id} className="card">
       <h1 className="index-text">{index + 1.}</h1>
       <h2 className="date-text">{new Date(resv.booking_time).toDateString()}</h2>
       <h2 className="time-text">{new Date(resv.booking_time).toLocaleTimeString()}</h2>
       <input onClick={this.handleClick}className="checkbox" type="checkbox" id={resv.id} name="completed" value="completed"/>
       <label className="checkbox-label" for="completed"> Finished?</label> 
   </div>
   </div>
  </div>
})

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