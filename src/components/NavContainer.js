import React from 'react'
import Modal from './Modal'
import Reservations from './Reservations'
import {Route, Switch, Link, Redirect} from 'react-router-dom'


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
               <Link to="/main">Home</Link>
                   <Link onClick={this.handleClick}>Create Listing</Link>
                    <Link to="/reservations">Reservations</Link>
                   <Link to="/account">Account</Link>
                   <li>Logout</li>
               </ul>

            </nav>
        {this.state.openModal ? <Modal currentUser={this.props.currentUser} closeModal={this.closeModal} sendNetToGetListing={this.props.sendNetToGetListing} showModal={this.state.openModal}/> : null}
</>
        )
    }
}

export default NavContainer