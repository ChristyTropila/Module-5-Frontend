import React from 'react'

class List extends React.Component{
    render(){

        let{lat, lng, available, user}=this.props.list
   
           
        return(
            <div className="list">
         <li>
             <h3>Host: <span>{user.name}</span></h3>
             <h4>Contact: <span>{user.contact}</span></h4>
             <p>Lat: <span>{lat}</span></p>
             <p>Lng: <span>{lng}</span></p>
             <p>Available: <span>{available ? "true": "false"}</span></p>
         </li>
         </div>
        )
    }
}

export default List