
import '../App.css';
import React from 'react'
import NavContainer from './NavContainer'
import ListingContainer from './ListingContainer'
import LoginRegister from './LoginRegister'
import {Route, Switch, Link, Redirect} from 'react-router-dom'
import Reservations from './Reservations'
import Account from './Account'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class App extends React.Component {

state={
  listings: [],
  currentUser: []
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

//When a user reserves a listing, update the available attritute to false
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
  
      })
    }


sendNetToGetUser=(userObj)=>{
  this.setState({
    currentUser: userObj
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
        <NavContainer currentUser={this.state.currentUser} 
      sendNetToGetListing={this.sendNetToGetListing}/> 
    <TransitionGroup>
      <CSSTransition
       classNames={'fade'}
       timeout={{enter: 1000, exit: 1000}}>


 <Switch>
    <Route path="/main">
     <ListingContainer currentUser={this.state.currentUser} 
      changeAvailable={this.sendNetToChangeAvailability} listings={this.state.listings}/> 
    </Route>  

    <Route path="/login">
     <LoginRegister getUser={this.sendNetToGetUser}/>
    </Route>
 
    <Route path="/reservations">
     <Reservations/>
    </Route>

    <Route path="/account">
      <Account/>
    </Route>
  </Switch>


       </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
}

export default App;
