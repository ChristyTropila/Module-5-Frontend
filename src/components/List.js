import React from 'react'
//import ListModal from './ListModal'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
import {API_K, LOC_K} from './config_keys'


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
    
render(){

    console.log(this.state.userLocation)
  const {lat, lng, available, user, id}=this.props.list
  const {userLocation} = this.state
  console.log(userLocation)

return(
    <> 
  {this.state.userLocation.lat !== 0 ?
 <div className="list" 
        style={{
             position: "relative",
              width: "100%", 
              height: "945px",
              borderRadius: "20px",
              
            }} className="map"
          >
     <Map google={this.props.google}
        style={{width: '100%', height: '100%'}}
        className={'map'}
        zoom={15}
        initialCenter={userLocation}
        disableDefaultUI= {true}>

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
