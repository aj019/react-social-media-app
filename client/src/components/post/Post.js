import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPost} from '../../actions/postActions'
import Spinner from '../common/Spinner'
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
class Post extends Component {

  componentDidMount(){
    if(this.props.match.params.postId)
    this.props.getPost(this.props.match.params.postId);
  }  

  render() {
    const {loading,post} = this.props;
    let postContent;

    if(post === null || loading || Object.keys(post).length === 0){
        postContent = <Spinner />
    }else{
        postContent = (<div>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
            </div>)
    }

    return (
        <div class="post">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    <Link to="/feed" className="btn btn-light mb-3"> Back To Feed</Link>
                    {postContent}
                    </div>
                </div>
            </div>
        </div>      
    )
  }
}

const mapStateToProps = (state) => ({
    loading: state.post.loading,
    post: state.post.post
})

export default connect(mapStateToProps,{getPost})(Post);