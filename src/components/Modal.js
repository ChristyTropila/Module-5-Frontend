import React from 'react'
import PlacesAutocomplete, {geocodeByAddress,  getLatLng,} from 'react-places-autocomplete'

class Modal extends React.Component{

    state={
        lat: "",
        lng: "",
        address: ''
    }



    handleInputChange=(address)=>{
        this.setState({address})
      }

      handleClick=()=>{
        this.props.closeModal()
      }

    handleSelect=(address)=>{
      console.log(this.props.currentUser.user)
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(({lat, lng})=>{
         this.setState({
             lat: lat,
             lng, lng
         })
        })
        .then(()=>{
            fetch('https://spot-a-potty.herokuapp.com/listings', {
                method: 'POST',
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": localStorage.token
                },
                body: JSON.stringify({
                   lat: this.state.lat,
                   lng: this.state.lng,
                   user_id: this.props.currentUser.user.id,
                   available: true,
                   address: address
                })
            })
            .then(res=>res.json())
            .then((newListing)=>{
             
                this.props.updateUser(newListing.user_id)
                this.props.sendNetToGetListing(newListing)
                this.props.closeModal()
                 this.props.changeRedirect()
            })
          
        })
      }


render(){
  console.log(this.props.currentUser)
     
  return(
    <div className="modal">
      <PlacesAutocomplete  value={this.state.address} onSelect={this.handleSelect} onChange={this.handleInputChange}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="modal-wrapper ">
            <h3 className="x-exit" onClick={this.handleClick}>X</h3>
              <h1 className="modal-head">Create Listing</h1>
              <h2 className="address-title">Enter Your Address</h2>
            <input
              {...getInputProps({
                placeholder: 'Start Typing ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

            </PlacesAutocomplete>
          

           </div>
        )

    }
}

export default Modal