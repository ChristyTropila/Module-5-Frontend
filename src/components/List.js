import React from 'react'
import ListModal from './ListModal'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import {API_K, LOC_K} from './config_keys'
import mapStyles from './mapStyles'


let hostIcon='https://res.cloudinary.com/dm3tfsraw/image/upload/v1604008205/littleman_xmjgpr.png'
let listingIcons='https://res.cloudinary.com/dm3tfsraw/image/upload/v1604008457/toilet_mmznr8.png'



class List extends React.Component{
    state={
        displayModal: false,
        userLocation: {lat: 0, lng: 0},
        index:''
    }

    //gets position of currentuser and places vector on map
    componentDidMount() {
        console.log("hit list")
        fetch(`https://geolocation-db.com/json/${LOC_K}`)
        .then(res=>res.json())
        .then((location)=>{
            this.setState({
                userLocation:{
                    lat: location.latitude,
                    lng: location.longitude
                }
            })
        })
      }

    handleClickedList=(index)=>{
        this.setState({
            displayModal:true,
            index: index
        })
    }

    closeListModal=()=>{
        this.setState({
        displayModal:false
     })

    }
   
    displayMarkers = () => {
        console.log("hit")
        return this.props.list.map((list, index) => {
          return <Marker icon={listingIcons} key={index} id={list.id}  position={{
           lat: list.lat,
           lng: list.lng
         }}
         onClick={() => this.handleClickedList(index)} />
         
        })
      }
      
render(){
//   const {lat, lng, available, user, id}=this.props.list
  const {userLocation} = this.state

    return(
        <> 
         {this.state.userLocation.lat !== 0 ?
             <div className="list">
            <Map google={this.props.google}
                styles={mapStyles.styles}
                className={'map'}
                zoom={17}
                initialCenter={userLocation}
                disableDefaultUI= {true}>
            <Marker icon={hostIcon} position={{
              lat: this.state.userLocation.lat,
              lng: this.state.userLocation.lng
          }}/>

          {this.displayMarkers()}
                </Map>
                </div>
                : 
                null}
         {this.state.displayModal ? <ListModal currentUser={this.props.currentUser}
          closeListModal={this.closeListModal}
          updateUser={this.props.updateUser}
           changeAvailable={this.props.changeAvailable} 
           list={this.props.list[this.state.index]}/>: null}

         </>
        )
    }
}

  export default GoogleApiWrapper({
        apiKey: API_K
      })(List)
