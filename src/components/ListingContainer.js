import React from 'react'
import List from './List'

function ListingContainer(props){


    let arrayOfListings=props.listings.map((list)=>{
        return<List
        key={list.id}
        list={list}
        changeAvailable={props.changeAvailable}
        currentUser={props.currentUser}
        />
    })
       return(
     <div className="listingContainer">
        <List
        list={props.listings}
        changeAvailable={props.changeAvailable}
        currentUser={props.currentUser}
        />


           {/* <ul>
               {arrayOfListings}
           </ul> */}
           </div>
       )

}

export default ListingContainer