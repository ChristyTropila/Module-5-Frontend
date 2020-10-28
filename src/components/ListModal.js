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
                <h3>Host: <span>{user.name}</span></h3>
                <h4>Contact: <span>{user.contact}</span></h4>
                <p>Lat: <span>{lat}</span></p>
                <p>Lng: <span>{lng}</span></p>
                <p>Available: <span>{available ? "Open": "Not Available"}</span></p>
            </li>
            <div className="modal-nav">
            <h3 onClick={this.handleReserveClick}>Reserve</h3>
            </div>
              <button onClick={this.hideListModal}>Back</button>

              {this.state.showModal ? <ReserveModal currentUser={this.props.currentUser} closeListModal={this.props.closeListModal} closeModal={this.closeModal} changeAvailable={this.props.changeAvailable} showModal={this.state.showModal} list={this.props.list} />: null}
            </div>
            
        )
    }
}

export default ListModal