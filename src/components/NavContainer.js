import React from 'react'
import Modal from './Modal'

class NavContainer extends React.Component{

    state={
        openModal: false
    }


    handleClick=()=>{
      this.setState({
          openModal: true
      })
    }

    closeModal=()=>{
        this.setState({
            openModal:false
        })
    }

    render(){
        return(
            <>
            <nav className="navContainer">
                <h1 className="logo">Spot-A-Potty</h1>
               <ul className="navList">
                   <li onClick={this.handleClick}>Create Listing</li>
                   <li>Reservations</li>
                   <li>Account</li>
                   <li>Logout</li>
               </ul>

            </nav>
        {this.state.openModal ? <Modal currentUser={this.props.currentUser} closeModal={this.closeModal} sendNetToGetListing={this.props.sendNetToGetListing} showModal={this.state.openModal}/> : null}
</>
        )
    }
}

export default NavContainer