import React from 'react'
import ReserveModal from './ReserveModal'


class ListModal extends React.Component{

    state={
        showModal: false
    }

    handleReserveClick=()=>{
        this.setState({
            showModal: true
        })
    }

    closeModal=()=>{
        this.setState({
            showModal:false
        })
    }

    hideListModal=(e)=>{
     e.preventDefault()
     this.closeModal()
     this.props.closeListModal()
   
    }
   


    render(){
        let{lat, lng, available, user, id}=this.props.list

        return(
        
            <div className="list-modal">
            
            <li>
                <h3>Availability: <span>{available ? "Open": "Not Available"}</span></h3>
                <h4>Host: <span>{user.name}</span></h4>
                <h4>Contact: <span>{user.contact}</span></h4>
            </li>
            <div className="modal-nav">
             {available === true ? <button className="reserve-btn" onClick={this.handleReserveClick}>Reserve</button> : null}
            </div>
              <button className="list-modal-btn" onClick={this.hideListModal}>Back</button>

              {this.state.showModal ? <ReserveModal currentUser={this.props.currentUser} closeListModal={this.props.closeListModal} closeModal={this.closeModal} changeAvailable={this.props.changeAvailable} showModal={this.state.showModal} list={this.props.list} />: null}
            </div>
            
        )
    }
}

export default ListModal