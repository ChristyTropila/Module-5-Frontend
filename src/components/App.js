
import '../App.css';
import React from 'react'
import NavContainer from './NavContainer.js'
import ListingContainer from './ListingContainer'

class App extends React.Component {

state={
  listings: []
}

componentDidMount(){
  fetch('http://localhost:5000/listings')
  .then(resp=>resp.json())
  .then((listingArray)=>{
    this.setState({
      listings: listingArray
    })
  })
}

sendNetToChangeAvailability=(listing)=>{
  fetch(`http://localhost:5000/listings/${listing.listing_id}`, {
    method: 'PATCH',
    headers: {
        "Content-Type": 'Application/json'
    },
    body: JSON.stringify({
      id: listing.listing_id
    })
  })
    .then(res=>res.json())
    .then((updatedListing)=>{

      const elementIndex=this.state.listings.findIndex(element =>
         element.id === updatedListing.id)
      
      let copyOfState=[...this.state.listings]
      copyOfState[elementIndex]={...copyOfState[elementIndex], 
        available: updatedListing.available
      }

      this.setState({
        listings: copyOfState
      })
      //  this.componentDidMount()
  
      })
    }
  

//use arrow function or undefined
sendNetToGetListing=(newListing)=>{
 let copyOfListings=[...this.state.listings, newListing]
 this.setState({
   listings: copyOfListings
 })
}

  render(){  

    
    return (
    <div className="App">
      <NavContainer sendNetToGetListing={this.sendNetToGetListing}/>
      <ListingContainer changeAvailable={this.sendNetToChangeAvailability} listings={this.state.listings}/>
       
    </div>
  );
}
}

export default App;
