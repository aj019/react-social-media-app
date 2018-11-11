import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addExperience} from '../../actions/profileActions'

class AddExperience extends Component {

  constructor(props){
    super(props);
    this.state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
        
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }  

  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({
              errors: nextProps.errors
          })
      }
  }

  onSubmit = (e) =>{
    e.preventDefault();

    const expData = {
        company: this.state.company,
        title: this.state.title,
        location: this.state.location,
        from: this.state.from,
        to: this.state.to,
        current: this.state.current,
        description: this.state.description,
    }

    this.props.addExperience(expData,this.props.history);


  }

  onChange = (e) =>{
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  onCheck = (e) =>{

    this.setState({
        current: !this.state.current
    })

  }

  render() {

    const {errors} = this.props;
    return (
      <div className="add-experience">
         <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to="/dashboard">Go Back</Link>
                    <h1 className="display-4 text-center">Add Experience</h1>
                    <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
                    <small className="d-block pb-3">* = required field</small>
                    <form className="" onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            placeholder="* Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                        />
                         <TextFieldGroup
                            placeholder="* Job Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            error={errors.title}
                        />
                         <TextFieldGroup
                            placeholder="* Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup
                            placeholder="* From Date"
                            name="from"
                            type="date"
                            value={this.state.from}
                            onChange={this.onChange}
                            error={errors.from}
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup
                            placeholder="* To Date"
                            name="to"
                            type="date"
                            value={this.state.to}
                            onChange={this.onChange}
                            error={errors.to}
                            disabled={this.state.current? 'disabled' : ''}
                        />
                       <div className="form-check mb-4">
                            <input className="form-check-input" 
                            type="checkbox" 
                            name="current" 
                            value={this.state.current}
                            checked={this.state.current}  
                            onChange={this.onCheck} 
                            id="current" />
                            <label className="form-check-label" htmlFor="current">
                                Current Job
                            </label>
                       </div> 
                       <TextAreaFieldGroup
                        placeholder="Job description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        error={errors.description}
                        />
                        <small className="form-text text-muted">Some of your responsabilities, etc</small>
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              
                    </form>

                </div>        
            </div>
         </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}

const mapStateToProps= (state) =>({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));