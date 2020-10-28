import React from 'react'
import ListModal from './ListModal'

class List extends React.Component{

    state={
        displayModal: false
    }

    handleClickedList=()=>{
        console.log('11')
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

  let{lat, lng, available, user, id}=this.props.list

return(
    <>
      <div onClick={this.handleClickedList} className="list">
         <li>
            <h3>List Number: <span>{id}</span></h3>
         </li>

      </div>

         {this.state.displayModal ? <ListModal currentUser={this.props.currentUser}
          closeListModal={this.closeListModal}
           changeAvailable={this.props.changeAvailable} 
           list={this.props.list}/>: null}

         </>
        )
    }
}

export default List