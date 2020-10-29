import React from 'react'
//import ListModal from './ListModal'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import {API_K, LOC_K} from './config_keys'
import mapStyles from './mapStyles'


let hostIcon='https://res.cloudinary.com/dm3tfsraw/image/upload/v1604008205/littleman_xmjgpr.png'
let listingIcons='https://res.cloudinary.com/dm3tfsraw/image/upload/v1604008457/toilet_mmznr8.png'

class List extends React.Component{

    state={
        displayModal: false,
        userLocation: {lat: 0, lng: 0}
    }

    componentDidMount() {
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
        // navigator.geolocation.getCurrentPosition(
        //   position => {
        //     const { latitude, longitude } = position.coords;
          
        //     this.setState({
        //       userLocation: { lat: latitude, lng: longitude },
        //       loading: false
        //     });
        //   },
        //   () => {
        //     this.setState({ loading: false });
        //   },
        //   {
        //     enableHighAccuracy: true, 
        //     maximumAge:0, 
        //     timeout:5000,
        //   }
        // );
      }

    handleClickedList=()=>{
        this.setState({
            displayModal:true
        })
    }

    closeListModal=()=>{
        console.log("hello")
        this.setState({
        displayModal:false
     })

     console.log("hello")
    }
    
   
    displayMarkers = () => {
        return this.props.list.map((list, index) => {
          return <Marker icon={listingIcons} key={index} id={list.id}  position={{
           lat: list.lat,
           lng: list.lng
         }}
         onClick={() => this.handleClickedHouse(index)} />
         
        })
      }
      
render(){
  const {lat, lng, available, user, id}=this.props.list
  const {userLocation} = this.state
//   let hostIcon=require("../images/littleman.png")
 
return(
 <> 
     {this.state.userLocation.lat !== 0 ?
         <div className="list" 
          >
            <Map google={this.props.google}
                styles={mapStyles.styles}
                className={'map'}
                zoom={18}
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
 


      {/* <div onClick={this.handleClickedList} className="list">
         <li>
            <h3>List Number: <span>{id}</span></h3>
         </li>

      </div>

         {this.state.displayModal ? <ListModal currentUser={this.props.currentUser}
          closeListModal={this.closeListModal}
           changeAvailable={this.props.changeAvailable} 
           list={this.props.list}/>: null} */}

         </>
        )
    }
}

  export default GoogleApiWrapper({
        apiKey: API_K
      })(List)
