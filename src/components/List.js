import React from 'react'
//import ListModal from './ListModal'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import {API_K, LOC_K} from './config_keys'
import mapStyles from './mapStyles'

let icons='https://snazzy-maps-cdn.azureedge.net/assets/marker-7fc0d75b-2b22-4e1f-8756-7b96f9b8db6c.png'

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
          return <Marker icon={icons} position={{
           lat: this.state.userLocation.lat,
           lng: this.state.userLocation.lng
          }}
           /> }
      
render(){
  const {lat, lng, available, user, id}=this.props.list
  const {userLocation} = this.state
 
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
         <Marker icon={icons} position={{
           lat: this.state.userLocation.lat,
           lng: this.state.userLocation.lng
          }}/>
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
