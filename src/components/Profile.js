import React from 'react'


class Profile extends React.Component{

   state={
       name: this.props.currentUser.user.name,
       email: this.props.currentUser.user.email,
       contact: this.props.currentUser.user.contact,
       ready: false,
       editComplete: false
   }
   componentDidMount(){
    setTimeout(this.handleLoading, 300);
}

    handleLoading=()=>{
     this.setState({
        ready:true
         })
    }
    handleInputChange=(evt)=>{
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }

      handleEditSubmit=(evt)=>{
          evt.preventDefault()
          console.log(this.props.currentUser.user.id)
          fetch(`http://localhost:5000/users/${this.props.currentUser.user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'Application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                contact: this.state.contact
            })
        })
        .then(res=>res.json())
        .then((updatedUser)=>{
            console.log(updatedUser)
          this.props.updateUser(updatedUser.id)
          this.setState({
              editComplete: true
          })
      
       
        })
    }
      

 render(){
   let{user}=this.props.currentUser 

   console.log(this.state.ready)
     return(
        <div className="reservation-comp">
         <div className="account-page">
          <div className="box"></div>
            <h1 className="listing-banner">Account</h1>
            <h1 className="listing-banner-3">Information</h1>
            <div className="profile-info">
           {this.state.ready ? <form onSubmit={this.handleEditSubmit}>
             <h1>Name</h1> <input className="profile-input-name"type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder={user.name} />
              <h1>Email</h1> <input className="profile-input-email" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder={user.email}/>
              <h1>Contact</h1> <input className="profile-input-contact" type="text" name="contact" value={this.state.contact} onChange={this.handleInputChange} placeholder={user.contact}/>
              <button type="submit" className={this.state.editComplete ? "edit-profile-2": "edit-profile"}>{this.state.editComplete ? "UPDATED!": "EDIT"}</button>
            </form> : null}
            </div>
          </div>
        </div>
        )

     

    
} 
}

export default Profile