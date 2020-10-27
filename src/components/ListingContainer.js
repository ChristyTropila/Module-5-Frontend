import React from 'react'
import List from './List'

function ListingContainer(props){


    let arrayOfListings=props.listings.map((list)=>{
        return<List
        key={list.id}
        list={list}
        />
    })
       return(
           <div className="listingContainer">
           <ul>
               {arrayOfListings}
           </ul>
           </div>
       )

}

export default ListingContainer