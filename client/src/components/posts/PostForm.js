import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postActions'
class PostForm extends Component {

  constructor(){
      super();
      this.state={
          text:'',
          errors:{}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }  

  componentWillReceiveProps(newProps){
      if(newProps.errors){
          this.setState({errors: newProps.errors})
      }
  }

  onSubmit(e) {
      e.preventDefault();

     const {user} = this.props.auth;

     const newPost = {
         text : this.state.text,
         name: user.name,
         avatar: user.avatar   
     }

     this.props.addPost(newPost);
     this.setState({text: ''});

  }

  onChange(e){
      e.preventDefault();

      this.setState({
          [e.target.name]: e.target.value
      })
  }

  render() {

    const {errors} = this.state;
    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <TextAreaFieldGroup
                    placeholder="Create a post"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                />
              </div>
              <button onClick={this.onSubmit} className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.proptypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{addPost})(PostForm);
