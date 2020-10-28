import React from 'react'

class LoginRegister extends React.Component{

    state={
      name: '',
      email: '',
      password: '',
      age: '',
      contact: ''
    }

    handleInputChange=(evt)=>{
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }

    handleSubmit=(evt)=>{
        evt.preventDefault()
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                "Content-Type": 'Application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                age: this.state.age,
                contact: this.state.contact
        })
        })
        .then(res=>res.json())
        .then((newUser)=>{
           this.props.getUser(newUser)
        })

    }

render(){


 return(
<div className="login-register">
 <form className="create-account-form"  onSubmit={this.handleSubmit}>
    <div className="create-account-input">
    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name" />
    <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email" />
    <input type="text" name="password"  value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
    <input type="text" name="age"  value={this.state.age} onChange={this.handleInputChange} placeholder="Age" />
    <input type="text" name="contact"  value={this.state.contact} onChange={this.handleInputChange} placeholder="Contact Number" />
   </div>
      <button className="create-acct-button" type="submit">Submit</button>
     </form>
     </div>
        )
    }
}

export default LoginRegister