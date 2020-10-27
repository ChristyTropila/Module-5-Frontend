import React from 'react'

class NavContainer extends React.Component{
    handleClick=()=>{

    }


    render(){
        return(
            <nav className="navContainer">
                <h1 className="logo">Spot-A-Potty</h1>
               <ul className="navList">
                   <li onClick={this.handleClick}>Create Listing</li>
                   <li>Reservations</li>
                   <li>Account</li>
                   <li>Logout</li>
               </ul>

            </nav>
        )
    }
}

export default NavContainer