
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

  render(){  

    
    return (
    <div className="App">
      <NavContainer/>
      <ListingContainer listings={this.state.listings}/>
       
    </div>
  );
}
}

export default App;
