import React from 'react'


class Account extends React.Component{

    state={
        ready:false
    }

    componentDidMount(){
        setTimeout(this.handleLoading, 300);
    }

    handleLoading=()=>{
        this.setState({
            ready:true
        })
    }
  


    deleteListing=(evt)=>{
        fetch(`http://localhost:5000/listings/${evt.target.id}`,{
         method: 'DELETE',
         headers: {
            "Authorization": localStorage.token
          }
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
    
   fetch(`http://localhost:5000/listings/${evt.target.id}`, {
   method: 'PATCH',
   headers: {
    "Authorization": localStorage.token
  }
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

     let userListings
    if(this.state.ready){
     userListings=this.props.currentUser.user.listings.map((list,index)=>{
     return<div key={list.id} className="account-div">
              <h2 className="act-list-items">{index+1}</h2>
              <h2 className="act-list-items">{list.address}</h2>
              <h3 className="act-list-items">You are listed as: {list.available ? "available" : "unavailable"}</h3>
              {list.getNameForReserv.length ===0 ? <button className="list-update" id={list.id} onClick={this.updateListing}>Change Availability</button> : null}
              {list.getNameForReserv.length>0 ? <h3 className="act-list-items">You are booked by: {list.getNameForReserv[0].name} </h3> :null}
              {list.getNameForReserv.length>0 ? <h3 className="act-list-items">Reservation time: {new Date(list.reservations[0].booking_time).toLocaleTimeString()}</h3>: null}
              {list.getNameForReserv.length >0 ? <h3 className="act-list-items">Contact for {list.getNameForReserv[0].name}: {list.getNameForReserv[0].contact} </h3> : null}
              {list.reservations.length===0 ?<button className="list-delete" id={list.id} onClick={this.deleteListing}>Remove Listing</button> : null}
          </div>
        })
    }

   console.log(userListings)
   console.log(this.state.ready)
        return(
            <div className="reservation-comp">
            <div className="account-page">
             <div className="box"></div>
             <h1 className="listing-banner">Listing</h1>
             <h1 className="listing-banner-2">Status</h1>
              {userListings}
    
            </div>
           </div>
        )
    }
}

export default Account