import React from 'react'
import {Redirect} from 'react-router-dom'

let logoImage=require("../images/spotapot2.png")
class LoginRegister extends React.Component{

    state={
      name: '',
      email: '',
      password: '',
      age: '',
      contact: '',
      emailLogin: '',
      passwordLogin: '',
      redirectToMain: '',
      errorMessage:""
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
        fetch(`https://spot-a-potty.herokuapp.com/users/login`,{
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
                this.setState({
                    errorMessage: loggedInUser.error
                });
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
        fetch('https://spot-a-potty.herokuapp.com/users', {
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
            if(newUser.error){
                this.setState({
                 errorMessage: newUser.error
                });
                <Redirect to="/login"/>
            }else{
           this.props.getUser(newUser)
           this.setState({
            redirectToMain: true
        })
    }
        })
    
    }

render(){
    if(this.state.redirectToMain){
        return <Redirect to="/main"/>
    }


let logoImage="https://res.cloudinary.com/dm3tfsraw/image/upload/v1605141271/meat_uea1xj.png"
let banner='https://res.cloudinary.com/dm3tfsraw/image/upload/v1605051179/spot_nkshfg.png'
let handle='https://res.cloudinary.com/dm3tfsraw/image/upload/v1605111461/handle2_lyqk2r.png'


 return(
 <div className="login-register">

  <img className="logoImage" src={logoImage} alt="Spot-A-Potty Logo"/>
  <h1 className="slogan">2020 was full of <span className="shit">sh*t.</span></h1>
  <h1 className="slogan-1">But <span className="you">you</span> don't have to be.</h1>
    <form className="create-account-form"  onSubmit={this.handleSubmit}>
    <div className="create-account-input">
    <h1 className="signup-head">User Signup</h1>
    <input className="name-input-sign" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Name" />
    <input className="email-input-sign" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="Email" />
    <input className="pass-input-sign"type="password" name="password"  value={this.state.password} onChange={this.handleInputChange} placeholder="Password" />
    <input className="age-input-sign" type="text" name="age"  value={this.state.age} onChange={this.handleInputChange} placeholder="Age" />
    <input className="contact-input-sign" type="text" name="contact"  value={this.state.contact} onChange={this.handleInputChange} placeholder="Contact Number" />
 </div>
      <button className="create-acct-button" type="submit">SIGNUP</button>
     </form>

    <form className="login-account-form"  onSubmit={this.handleLoginSubmit}>
    <div className="create-account-input">
    <h1 className="login-head">User Login</h1>
    <input className="email-input-log" type="text" name="emailLogin" value={this.state.emailLogin} onChange={this.handleLoginInputChange} placeholder="Email" />
    <input className="pass-input-log" type="password" name="passwordLogin"  value={this.state.passwordLogin} onChange={this.handleLoginInputChange} placeholder="Password" />
    </div>
      <button className="login-acct-button" type="submit">LOGIN</button>
     </form>
  <img className="banner-1" src={banner} alt="Spot-A-Potty banner"/>
  <img className="banner-2" src={banner} alt="Spot-A-Potty banner"/>
  <img className="hanger-1" src={handle} alt="Picture hanger"/>
  <img className="hanger-2" src={handle} alt="Picture hanger"/>
  {this.state.errorMessage && <h3 className="error">{this.state.errorMessage}</h3>}


</div>
        )
    }
}

export default LoginRegister