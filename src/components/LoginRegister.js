import React from 'react'
import {Redirect} from 'react-router-dom'

class LoginRegister extends React.Component{

    state={
      name: '',
      email: '',
      password: '',
      age: '',
      contact: '',
      emailLogin: '',
      passwordLogin: '',
      redirectToMain: ''
    }

    handleInputChange=(evt)=>{
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }
    
    handleLoginInputChange=(evt)=>{
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleLoginSubmit=(evt)=>{
        evt.preventDefault()
        fetch(`http://localhost:5000/users/login`,{
            method: 'POST',
            headers: {
              "Content-Type": "Application/json"
            },
            body: JSON.stringify({
             email: this.state.emailLogin,
             password: this.state.passwordLogin
            }) 
        })
        .then(res=>res.json())
        .then((loggedInUser)=>{
            if(loggedInUser.error){
                <Redirect to="/login"/>
            }else{
            this.props.getUser(loggedInUser)
            this.setState({
                redirectToMain: true
            })
        }
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
           this.setState({
            redirectToMain: true
        })
        })

    }

render(){
    if(this.state.redirectToMain){
        return <Redirect to="/main"/>
    }
 return(
 <div className="login-register">
    <form className="create-account-form"  onSubmit={this.handleSubmit}>
    <div className="create-account-input">
    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name" />
    <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email" />
    <input type="password" name="password"  value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
    <input type="text" name="age"  value={this.state.age} onChange={this.handleInputChange} placeholder="Age" />
    <input type="text" name="contact"  value={this.state.contact} onChange={this.handleInputChange} placeholder="Contact Number" />
 </div>
      <button className="create-acct-button" type="submit">Submit</button>
     </form>

    <form className="create-account-form"  onSubmit={this.handleLoginSubmit}>
    <div className="create-account-input">
    <input type="text" name="emailLogin" value={this.state.emailLogin} onChange={this.handleLoginInputChange} placeholder="Email" />
    <input type="password" name="passwordLogin"  value={this.state.passwordLogin} onChange={this.handleLoginInputChange} placeholder="Password" />
    </div>
      <button className="create-acct-button" type="submit">Login</button>
     </form>

</div>
        )
    }
}

export default LoginRegister