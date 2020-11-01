import React from 'react'

class Account extends React.Component{


    deleteListing=(evt)=>{
        fetch(`http://localhost:5000/listings/${evt.target.id}`,{
         method: 'DELETE'
        })
        .then(res=>res.json())
        .then((deletedListing)=>{
            if(deletedListing.error){
                console.log("error")
             }else{
            console.log(deletedListing)
            console.log(deletedListing.user)
           this.props.updateUser(deletedListing.user_id)
        }
    })
    }


    updateListing=(evt)=>{
        console.log(evt.target.id)
       fetch(`http://localhost:5000/listings/${evt.target.id}`, {
       method: 'PATCH'
    })
    .then(res=>res.json())
    .then((updatedListing)=>{
        if(updatedListing.error){
           console.log("error")
         }else{
        console.log(updatedListing)
        this.props.changeAvailable(updatedListing)
        this.props.updateUser(updatedListing.user_id)
    }
    })

    }

    getUserName=(user)=>{
        user.map((singleUser)=>{
           return singleUser.name
        })
    }

 

    render(){
        console.log(this.props.currentUser.listings)
        let userListings=this.props.currentUser.listings.map((list,index)=>{
          return<div key={list.id} className="account-div">
                <h2>{list.address}</h2>
                <h3>You are listed as: {list.available ? "available" : "unavailable"}</h3>
                {list.getNameForReserv.length ===0 ? <button className="list-update" id={list.id} onClick={this.updateListing}>Update Status</button> : null}
              {list.getNameForReserv.length>0 ? <h3>You are booked by: {list.getNameForReserv[index].name} </h3> :null}
           {list.getNameForReserv.length >0 ? <h3>Contact for {list.getNameForReserv[index].name}: {list.getNameForReserv[index].contact} </h3> : null}
              {list.reservations.length===0 ?<button className="list-delete" id={list.id} onClick={this.deleteListing}>Remove Listing</button> : null}
           
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