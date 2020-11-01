
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
  currentUser: [],
  reservations:[]
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
  console.log(listing)
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

// updateUserState=(user)=>{
//  let copyOfUser=[this.state.currentUser]
//  if(copyOfUser.id===user.user_id){
//    this.setState({
     
//    })
//  }
 
// // this.componentDidMount()
// }




updatedListing=(listing)=>{
  console.log(listing)
}


sendNetToGetUser=(userObj)=>{
  this.setState({
    currentUser: userObj
  })
 
}

updateUser=(user)=>{
  fetch(`http://localhost:5000/users/${user.user_id}`)
  .then(res=>res.json())
  .then((updatedUser)=>{
    this.setState({
      currentUser: updatedUser
    })
  })
  this.componentDidMount()
}

updatedUser=(user)=>{
  fetch(`http://localhost:5000/users/${user}`)
  .then(res=>res.json())
  .then((updatedUser)=>{
    this.setState({
      currentUser: updatedUser
    })
  })
  this.componentDidMount()
}

  

//use arrow function or undefined
sendNetToGetListing=(newListing)=>{
 let copyOfListings=[...this.state.listings, newListing]
 this.setState({
   listings: copyOfListings
 })
}

  render(){  

   console.log(this.state.currentUser)

    return (

  <div className="App">

        <TransitionGroup>
          <CSSTransition
            classNames={'fade'}
            timeout={{enter: 1000, exit: 1000}}>


 <Switch>
    <Route path="/main">
    <NavContainer  updateUser={this.updatedUser} currentUser={this.state.currentUser} 
            sendNetToGetListing={this.sendNetToGetListing}/> 
     <ListingContainer updateUser={this.updateUser} currentUser={this.state.currentUser} 
      changeAvailable={this.sendNetToChangeAvailability} listings={this.state.listings}/> 
    </Route>  

    <Route path="/login">
     <LoginRegister getUser={this.sendNetToGetUser}/>
    </Route>
 
    <Route path="/reservations">
    <NavContainer currentUser={this.state.currentUser} 
            sendNetToGetListing={this.sendNetToGetListing}/> 
     <Reservations updateUserState={this.updateUser} currentUser={this.state.currentUser}/>
    </Route>

    <Route path="/account">
    <NavContainer currentUser={this.state.currentUser} 
            sendNetToGetListing={this.sendNetToGetListing}/> 
    <Account changeAvailable={this.sendNetToChangeAvailability} updateUser={this.updatedUser} currentUser={this.state.currentUser}/>
    </Route>
  </Switch>


       </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
}

export default App;
