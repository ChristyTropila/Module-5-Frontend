import React from 'react'

class ReserveModal extends React.Component{

    state={
        time:""
    }
  
    handleChange=(evt)=>{
        this.setState({
            [evt.target.name]: evt.target.value
          })
    }

 handleSubmit=(evt)=>{
   console.log(this.props.currentUser)
        evt.preventDefault()
        fetch('http://localhost:5000/reservations', {
            method: 'POST',
            headers: {
                "Content-Type": 'Application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                listing_id: this.props.list.id,
                booking_time: this.state.time
        })
    })
    .then(res=>res.json())
    .then((newReserve)=>{
        console.log(newReserve)
        this.props.changeAvailable(newReserve)
        this.props.closeModal()
        this.props.closeListModal()
        this.props.updateUser(newReserve)
    })
}
    

    render(){
       console.log(this.props.changeAvailable)
       console.log(this.props.currentUser)

 return(
<div className="reservation-wrapper"
        style={{
            opacity: this.props.showModal ? '1' : '0'}}
        >
  <form className="reservation-form" onSubmit={this.handleSubmit}>
     <div className="reserve-form">
       <input className="reserve-input" type="time" name="time" value={this.state.time} onChange={this.handleChange} required/>
     </div>

        <button className="list-button" type="submit">
            Create 
        </button>
  </form>

</div>
        )
    }
}

export default ReserveModal