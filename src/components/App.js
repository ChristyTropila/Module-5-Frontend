
import '../App.css';
import React from 'react'
import NavContainer from './NavContainer'
import ListingContainer from './ListingContainer'
import LoginRegister from './LoginRegister'
import {Route, Switch, Link, Redirect, withRouter} from 'react-router-dom'
import Reservations from './Reservations'
import Account from './Account'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {ActionCableProvider} from 'react-actioncable-provider'
import Profile from './Profile'

class App extends React.Component {

state={
  listings: [],
  currentUser: [],
  reservations:[],
  token:""
}

componentDidMount(){
  if(localStorage.token){
   fetch('https://spot-a-potty.herokuapp.com/users/keep_logged_in', {
    method: 'GET',
    headers: {
      "Authorization": localStorage.token
    }
  })
  .then(res=>res.json())
  .then(this.helpHandleResponse)
  this.fetchListings()
}
}


helpHandleResponse=(resp)=>{
  localStorage.token=resp.token
  this.setState({
    currentUser: resp,
    token: resp.token
  })
 
}


 fetchListings=()=>{
   console.log("hit fetch listings")
  fetch('https://spot-a-potty.herokuapp.com/listings')
  .then(resp=>resp.json())
  .then((listingArray)=>{
    this.setState({
      listings: listingArray
    })
  })
}
 


//When a user reserves a listing, update the available attritute to false
sendNetToChangeAvailability=(listing)=>{

  fetch(`https://spot-a-potty.herokuapp.com/listings/${listing.listing_id}`, {
    method: 'PATCH',
    headers: {
        "Content-Type": 'Application/json', 
        "Authorization": localStorage.token
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
  fetch(`https://spot-a-potty.herokuapp.com/users/${user.user_id}`)
  .then(res=>res.json())
  .then((updatedUser)=>{
    this.setState({
      currentUser: updatedUser
    })
  })

  this.componentDidMount()
}

updatedUser=(user)=>{
  fetch(`https://spot-a-potty.herokuapp.com/users/${user}`)
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

  setCurrentUserToEmpty=()=>{
    this.setState({
      currentUser:[]
    })
  }

  getConvData=(id)=>{
    fetch(`https://spot-a-potty.herokuapp.com/conversations/${id}`)
    .then(res=>res.json())
    .then(result => {
      this.setState({
        currentRoom:{
          conversation: result.data,
          users: result.data.attributes.users,
          messages: result.data.attributes.messages
        }
      })
    })
  }

  updateAppStateConv=(newConv)=>{
    this.setState({
      conversation: newConv.conversation.data,
      users: newConv.users,
      messages: newConv.messages
    })
  }


render(){  
  console.log(this.state.currentUser)

 return (
  <div className="App">
  
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
    <ActionCableProvider url={'ws://localhost:5000/cable'}>
    {this.state.currentUser.length> 0 ? <Redirect to="/login"/> : 
    <NavContainer  setUserToEmpty={this.setCurrentUserToEmpty} currentUser={this.state.currentUser} 
      sendNetToGetListing={this.sendNetToGetListing}/> }
   {this.state.currentUser.length> 0 ? <Redirect to="/login"/> : 
     <Reservations helpHandleResponse={this.helpHandleResponse} updateListing={this.sendNetToUpdateListing} updateUserState={this.updateUser} currentUser={this.state.currentUser}/>}
   </ActionCableProvider>
    </Route>

    <Route path="/account">
    <ActionCableProvider url={'ws://localhost:5000/cable'}>
    <NavContainer  setUserToEmpty={this.setCurrentUserToEmpty} currentUser={this.state.currentUser} 
            sendNetToGetListing={this.sendNetToGetListing}/> 
    <Account helpHandleResponse={this.helpHandleResponse} changeAvailable={this.sendNetToChangeAvailability} updateUser={this.updatedUser} currentUser={this.state.currentUser}/>
     </ActionCableProvider>
    </Route>


  <Route path='/profile'>
  <NavContainer setUserToEmpty={this.setCurrentUserToEmpty} currentUser={this.state.currentUser} 
            sendNetToGetListing={this.sendNetToGetListing}/> 
    <Profile updateUser={this.updatedUser} currentUser={this.state.currentUser}/>
  </Route>
  </Switch>
    
    </div>
  );
}
}

let magicComponent=withRouter(App)
export default magicComponent;
