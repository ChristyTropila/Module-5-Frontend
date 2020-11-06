import React from 'react'
import Modal from './Modal'
import {Link, Redirect} from 'react-router-dom'


class NavContainer extends React.Component{

    state={
        openModal: false,
        redirectToLogin: false,
        ready: false
    }

    componentDidMount(){
        setTimeout(this.handleLoading,2000);
    }
  
    handleLoading=()=>{
        this.setState({
            ready:true
        })
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

    handleLogout=()=>{
        this.setState({
            redirectToLogin: true
        })
       setTimeout(() => {
        this.props.setUserToEmpty()
        localStorage.clear()
       }, 2000);  
 
    }

  

 render(){

  if(this.state.redirectToLogin){
    this.setState({
      redirectToLogin:false
    })
    return <Redirect to="/login"/>
  }
 return(
    <>
     <nav className="navContainer">
      {this.state.ready ?<span className={this.props.currentUser.user.reservations.length>0 ?"resv-badge" : "resv-badge-hide"}>{this.props.currentUser.user.reservations.length}</span> : null } 
      {this.state.ready ?<span className={this.props.currentUser.user.listings[0].reservations.length>0 ?"list-badge" : "list-badge-hide"}>{this.props.currentUser.user.listings[0].reservations.length}</span> : null } 

            <h1 className="logo">Spot-A-Potty</h1>
               <ul className="navList">
                   <Link className="li-nav" to="/main">Home</Link>
                   <Link className="li-nav" to="/main" onClick={this.handleClick}>Create Listing</Link>
                   <Link className="li-nav"to="/account">Manage Listing</Link>
                   <Link className="li-nav"to="/reservations">Reservations</Link>
                   <li className="li-nav" onClick={this.handleLogout}>Logout</li>
               </ul>

        </nav>
        {this.state.openModal ? <Modal helpHandleResponse={this.props.helpHandleResponse} changeRedirect={this.props.changeRedirect} updateUser={this.props.updateUser} currentUser={this.props.currentUser} closeModal={this.closeModal} sendNetToGetListing={this.props.sendNetToGetListing} showModal={this.state.openModal}/> : null}
        : 
        </>
        )
    }
}

export default NavContainer