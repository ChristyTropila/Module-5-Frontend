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
        debugger
        this.props.changeAvailable(newReserve)
        this.props.closeModal()
        this.props.closeListModal()
    })
}
    

    render(){
        console.log(this.state.time)

 return(
    <div className="reservation-wrapper"
        style={{
            opacity: this.props.showModal ? '1' : '0'}}
        >
        <form className="reservation-form" onSubmit={this.handleSubmit}>
        <div className="reserve-form">
        <h4>Make Reservation</h4>
        
       <input type="time" name="time" value={this.state.time} onChange={this.handleChange} required/>
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