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
                   <Link className="li-nav" to="/main">Home</Link>
                   <Link className="li-nav" onClick={this.handleClick}>Create Listing</Link>
                   <Link className="li-nav"to="/account">Manage Listing</Link>
                   <Link className="li-nav"to="/reservations">Reservations</Link>
                   <li className="li-nav">Logout</li>
               </ul>

        </nav>
        {this.state.openModal ? <Modal updateUser={this.props.updateUser} currentUser={this.props.currentUser} closeModal={this.closeModal} sendNetToGetListing={this.props.sendNetToGetListing} showModal={this.state.openModal}/> : null}
            </>
        )
    }
}

export default NavContainer