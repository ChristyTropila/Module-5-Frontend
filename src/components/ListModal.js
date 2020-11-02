import React from 'react'
import ReserveModal from './ReserveModal'


class ListModal extends React.Component{

    state={
        showModal: false,
     
    }

    handleReserveClick=()=>{
        this.setState({
            showModal: true
        })
    }

    closeModal=()=>{
        this.setState({
            showModal:false
        })
    }

    hideListModal=(e)=>{
        e.preventDefault()
        this.closeModal()
        this.props.closeListModal()
   
    }

 render(){
      console.log(this.props.list.reviews)
        let{lat, lng, available, user, id}=this.props.list

        let reviewList=this.props.list.reviews.map((review)=>{
                return<h5 className="title-list-2" key={review.id}>
                    "{review.review_text}"
                </h5>
            })
                       
                     
  return(
        
    <div className="list-modal">
    <li className="list-modal-li">
      <h3 className="x-exit-list" onClick={this.hideListModal}>X</h3>
        <h3 className="title-list">Status: {available ? "Open": "Not Available"}</h3>
        <h3 className="title-list">Host: {user.name}</h3>
         {this.props.list.reviews.length > 0 ? <h4><span className="title-list">Reviews:</span><div className="reviewList">{reviewList} </div> </h4> : <h4><span className="title-list">Reviews:</span><div className="reviewList"><h4 className="title-list-2" >No Reviews For This Listing </h4></div> </h4> }
            </li>
            <div className="modal-nav">
             {available === true ? <button className="reserve-btn" onClick={this.handleReserveClick}>Reserve</button> : null}
            </div>

              {this.state.showModal ? <ReserveModal updateUser={this.props.updateUser} currentUser={this.props.currentUser} closeListModal={this.props.closeListModal} closeModal={this.closeModal} changeAvailable={this.props.changeAvailable} showModal={this.state.showModal} list={this.props.list} />: null}
            </div>
            
        )
    }
}

export default ListModal