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
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(({lat, lng})=>{
         this.setState({
             lat: lat,
             lng, lng
         })
        })
        .then(()=>{
            fetch('http://localhost:5000/listings', {
                method: 'POST',
                headers: {
                    "Content-Type": 'Application/json'
                },
                body: JSON.stringify({
                   lat: this.state.lat,
                   lng: this.state.lng,
                   user_id: this.props.currentUser.id,
                   available: true
                })
            })
            .then(res=>res.json())
            .then((newListing)=>{
                console.log(newListing)
                console.log(newListing.user_id)
                this.props.sendNetToGetListing(newListing)
                this.props.closeModal()
                this.props.updateUser(newListing.user_id)
            })
          
        })
      }


    render(){
      console.log(this.props.currentUser)

      // console.log(this.props.updateUser)
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
        //  <div className="modal-wrapper"
        //     style={{
        //         opacity: this.props.showModal ? '1' : '0'
        //     }}
        //     >
        //         <form className="listing-form" onSubmit={this.handleSubmit}>
        //         <div className="list-form">
        //             <h4>Create A Listing</h4>

        //             <input type="text" name="address" value={this.state.address} onChange={this.handleInputChange} placeholder="Address"/>
        //             </div>
        //             <button className="list-button" type="submit">
        //                 Create 
        //             </button>
        //         </form>

        //     </div>
        )

    }
}

export default Modal