import React from 'react'
import List from './List'

function ListingContainer(props){

       return(
     <div className="listingContainer">
        <List
        list={props.listings}
        changeAvailable={props.changeAvailable}
        currentUser={props.currentUser}
        updateUser={props.updateUser}
        />

           </div>
       )

}

export default ListingContainer