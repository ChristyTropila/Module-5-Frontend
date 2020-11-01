import React from 'react'

class Account extends React.Component{


    deleteListing=(evt)=>{
        fetch(`http://localhost:5000/listings/${evt.target.id}`,{
         method: 'DELETE'
        })
        .then(res=>res.json())
        .then((deletedListing)=>{
            console.log(deletedListing)
            console.log(deletedListing.user)
           this.props.updateUser(deletedListing.user_id)
        })
    }


    updateListing=(evt)=>{
        console.log(evt.target.id)
       fetch(`http://localhost:5000/listings/${evt.target.id}`, {
       method: 'PATCH'
    })
    .then(res=>res.json())
    .then((updatedListing)=>{
        console.log(updatedListing)
        this.props.changeAvailable(updatedListing)
        this.props.updateUser(updatedListing.user_id)
    })

    }

    render(){
        let userListings=this.props.currentUser.listings.map((list)=>{
          return<div key={list.id} className="account-div">
                <h2>{list.id}</h2>
                <h3>You are listed as: {list.available ? "available" : "unavailable"}</h3>
                <button id={list.id} onClick={this.updateListing}>Update Status</button>
                {list.available===false ? <h3>You are booked by: </h3> : null}
                <button id={list.id} onClick={this.deleteListing}>Remove Listing</button>
           
          </div>
        })

        return(
         <div className="account-container">
             <h1 className="act-header">Current Listing Status</h1>
             
              {userListings}
            </div>
        )
    }
}

export default Account