import React from 'react'

class ReserveModal extends React.Component{


    render(){
        console.log(this.props.list)

        return(
<div className="reservation-wrapper"
style={{
    opacity: this.props.showModal ? '1' : '0'
}}
>
    <form className="reservation-form" onSubmit={this.handleSubmit}>
    <div className="reserve-form">
        <h4>Make Reservation</h4>
        
<input type="time" id="appt" name="appt" required/>
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