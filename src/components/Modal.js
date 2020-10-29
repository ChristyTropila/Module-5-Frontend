import React from 'react'

class Modal extends React.Component{

    state={
        // lat: "",
        // lng: ""
        address: ''
    }


    handleInputChange=(evt)=>{
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }


    handleSubmit=(evt)=>{
          evt.preventDefault()
          fetch('http://localhost:5000/listings', {
              method: 'POST',
              headers: {
                  "Content-Type": 'Application/json'
              },
              body: JSON.stringify({
                  address: this.state.address,
                  user_id: this.props.currentUser.id,
                  available: true
              })
          })
          .then(res=>res.json())
          .then((newListing)=>{
              console.log(newListing)
              this.props.sendNetToGetListing(newListing)
              this.props.closeModal()
          })
        
      }


    render(){

      
        return(
         <div className="modal-wrapper"
            style={{
                opacity: this.props.showModal ? '1' : '0'
            }}
            >
                <form className="listing-form" onSubmit={this.handleSubmit}>
                <div className="list-form">
                    <h4>Create A Listing</h4>

                    <input type="text" name="address" value={this.state.address} onChange={this.handleInputChange} placeholder="Address"/>

                        {/* <input type="text" name="lat" value={this.state.lat} onChange={this.handleInputChange} placeholder="Lat"/>
                        <input type="text" name="lng" value={this.state.lng} onChange={this.handleInputChange} placeholder="Lng"/> */}
                    </div>
                    <button className="list-button" type="submit">
                        Create 
                    </button>
                </form>

            </div>
        )

    }
}

export default Modal