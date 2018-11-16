import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PostForm from './PostForm'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {getPosts} from '../../actions/postActions'
import Spinner from '../common/Spinner'
import PostFeed from './PostFeed'

class Posts extends Component {

  componentDidMount(){
    this.props.getPosts();
  }

  render() {

    const {loading, posts} = this.props.post;
    let postContent;

    if(posts === null || loading){
      postContent = <Spinner />
    }
    else{
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            <PostForm />
            {postContent}
            </div>
          </div>
        </div>    
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps,{getPosts})(Posts);