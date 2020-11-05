
import '../App.css';
import React from 'react'
import NavContainer from './NavContainer'
import ListingContainer from './ListingContainer'
import LoginRegister from './LoginRegister'
import {Route, Switch, Link, Redirect, withRouter} from 'react-router-dom'
import Reservations from './Reservations'
import Account from './Account'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class App extends React.Component {

state={
  listings: [],
  currentUser: [],
  reservations:[],
  token:""
}

componentDidMount(){
debugger;
console.log("app component did mount")
if(localStorage.token){
  fetch('http://localhost:5000/users/keep_logged_in', {
    method: 'GET',
    headers: {
      "Authorization": localStorage.token
    }
  })
  .then(res=>res.json())
  .then(this.helpHandleResponse)
}
}

componentWillUnmount(){
  debugger;
}

helpHandleResponse=(resp)=>{
 console.log("help handle response")
  localStorage.token=resp.token
  this.setState({
    currentUser: resp,
    token: resp.token
  })
  this.fetchListings()
}


 fetchListings=()=>{
   console.log("fetching listings")
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
  console.log("send net to change available")
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

    sendNetToUpdateListing=(listing)=>{
      console.log("send net to update listing")
      console.log("updating listing")
      let elementIndex=this.state.listings.findIndex(element=>
        element.id ===listing.id
        )

      let copyOfState=[...this.state.listings]
      copyOfState[elementIndex]=listing
       this.setState({
         listings: copyOfState
       })
      }
 
   changeRedirect=()=>{
        this.setState({
          changeRedirect: true
        })
      }

  sendNetToGetUser=(userObj)=>{
    console.log("send net to get user")
    //  this.setState({
    //    currentUser: userObj
    //  })
    if(userObj.error){
        alert(userObj.error)
      } else{
      localStorage.token=userObj.token
      this.setState({
        currentUser: userObj,
        token: userObj.token
      })
    
    }
  }

updateUser=(user)=>{
  console.log("updating user")
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
  console.log("updateduser")
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
  console.log("send net ot get listings")
 let copyOfListings=[...this.state.listings, newListing]
 this.setState({
   listings: copyOfListings
 })
}

  setCurrentUserToEmpty=()=>{
    this.setState({
      currentUser:[]
    })
  }

render(){  
 console.log(this.state.currentUser)
 console.log(this.state.listings)

 return (
  <div className="App">
        <TransitionGroup>
          <CSSTransition
            classNames={'fade'}
            timeout={{enter: 1000, exit: 1000}}>


 <Switch>


  <Route path="/main">
    {this.state.currentUser.length> 0 ? <Redirect to="/login"/> :
    <NavContainer setUserToEmpty={this.setCurrentUserToEmpty} logout={this.logoutUser} changeRedirect={this.changeRedirect} updateUser={this.updatedUser} currentUser={this.state.currentUser} 
      sendNetToGetListing={this.sendNetToGetListing}/> }
     {this.state.currentUser.length> 0 ? <Redirect to="/login"/> :
     <ListingContainer updateUser={this.updateUser} currentUser={this.state.currentUser} 
      changeAvailable={this.sendNetToChangeAvailability} listings={this.state.listings}/> }
      
    </Route>  

    <Route path="/login">
     <LoginRegister getUser={this.sendNetToGetUser}/>
    </Route>
 
    <Route path="/reservations">
    {this.state.currentUser.length> 0 ? <Redirect to="/login"/> : 
    <NavContainer  setUserToEmpty={this.setCurrentUserToEmpty} currentUser={this.state.currentUser} 
 sendNetToGetListing={this.sendNetToGetListing}/> }
   {this.state.currentUser.length> 0 ? <Redirect to="/login"/> : 
     <Reservations  helpHandleResponse={this.helpHandleResponse} updateListing={this.sendNetToUpdateListing} updateUserState={this.updateUser} currentUser={this.state.currentUser}/>}
    </Route>

    <Route path="/account">
    <NavContainer  setUserToEmpty={this.setCurrentUserToEmpty} currentUser={this.state.currentUser} 
            sendNetToGetListing={this.sendNetToGetListing}/> 
    <Account helpHandleResponse={this.helpHandleResponse} changeAvailable={this.sendNetToChangeAvailability} updateUser={this.updatedUser} currentUser={this.state.currentUser}/>
   
    </Route>
  </Switch>


       </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
}

let magicComponent=withRouter(App)
export default magicComponent;
