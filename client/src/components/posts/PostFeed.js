import React, { Component } from 'react'
import PostItem from './PostItem'

class PostFeed extends Component {
    
  render() {
    console.log(this.props);  
    return this.props.posts.map(post => <PostItem key={post._id} post={post} />)
  }
}

export default PostFeed;
