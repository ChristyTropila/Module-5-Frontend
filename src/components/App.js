
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
      <ListingContainer listings={this.state.listings}/>
       
    </div>
  );
}
}

export default App;
