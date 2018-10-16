import React, { Component } from "react";
import classnames from 'classnames';
import {registerUser} from '../../actions/authActions'
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";



class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
  
    }

    // axios.post('/api/users/register',newUser)
    //       .then(res => console.log(res.data))
    //       .catch(err => this.setState({errors: err.response.data}))

    this.props.registerUser(newUser, this.props.history)

  }

  componentWillReceiveProps(newProps){
    if(newProps.errors){
      this.setState({
        errors: newProps.errors
      })
    }
  }


  render() {

    console.log(this.state); 
    const {errors} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",{
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  { errors.name == null ? '' : <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg",{
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                   { errors.email == null ? '' : <div className="invalid-feedback">{errors.email}</div>}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                   { errors.password == null ? '' : <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                   { errors.password2 == null ? '' : <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps,{ registerUser})(withRouter(Register));
