import React from 'react'
import ListModal from './ListModal'

class List extends React.Component{

    state={
        displayModal: false
    }

    handleClickedList=()=>{
        this.setState({
            displayModal:true
        })
    }

    render(){
        let{lat, lng, available, user, id}=this.props.list
   
           
     return(
      <div onClick={this.handleClickedList} className="list">
         <li>
             <h3>List Number: <span>{id}</span></h3>
         </li>
         {this.state.displayModal ? <ListModal list={this.props.list}/>: null}

         </div>
        )
    }
}

export default List