import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deletePost,addLike,removeLike} from '../../actions/postActions'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class PostItem extends Component {

  onDeleteClick(id){
    this.props.deletePost(id);
  } 
  
  onLikeClick(id){
    this.props.addLike(id);
  } 

  onUnlikeClick(id){
    this.props.removeLike(id);
  } 

  findUserLikes(likes){
    console.log('Likes',likes.length);
    if(likes.length > 0){
      const {auth} = this.props;
      if(likes.filter(like => like.user === auth.user.id).length > 0){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }


  render() {

    const {post,auth,showActions} = this.props;
    console.log('Post Item',post);
    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar}
                alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            { showActions && (<React.Fragment>
              <button type="button" onClick={this.onLikeClick.bind(this,post._id)} className="btn btn-light mr-1">
              <i className={classnames('fas fa-thumbs-up',{
                'text-info' : this.findUserLikes(post.likes)
              })}></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" onClick={this.onUnlikeClick.bind(this,post._id)} className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link> 
            {post.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this,post._id)} type="button" className="btn btn-danger mr-1">
                    <i className="fas fa-times" />
                  </button>) : <React.Fragment></React.Fragment>}
            </React.Fragment>)
            }
          </div>
        </div>
      </div>

    )

  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  showActions: PropTypes.bool
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps,{deletePost,addLike,removeLike})(PostItem);