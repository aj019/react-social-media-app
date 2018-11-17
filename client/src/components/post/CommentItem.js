import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteComment} from '../../actions/postActions'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class CommentItem extends Component {

  onDeleteClick(postId,CommentId){
    this.props.deleteComment(postId,CommentId);
  }  
  render() {

    const {comment,postId,auth} = this.props;

    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profiles">
              <img className="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/anything?s=200&d=mm" alt="" />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this,postId,comment._id)} type="button" className="btn btn-danger mr-1">
                    <i className="fas fa-times" />
                  </button>) : <React.Fragment></React.Fragment>}
          </div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
}

export default connect(mapStateToProps,{deleteComment})(CommentItem);