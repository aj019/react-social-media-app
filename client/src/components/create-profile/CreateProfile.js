import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import {createProfile} from '../../actions/profileActions'

class CreateProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}

    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }  

  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({
            errors: nextProps.errors
          });
      }
  }

  onSubmit(e){
    e.preventDefault();

    const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.state.instagram,
    }
     console.log(profileData);   
     this.props.createProfile(profileData, this.props.history);   

  }

  onChange(e){
    this.setState({
        [e.target.name] : e.target.value
    });
  }


  render() {

    const {errors, displaySocialInputs} = this.state;

    const options = [
        { label: 'Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }   
    ]

    let socialInputs;

    if(displaySocialInputs){
        socialInputs =(
            <div>
                <InputGroup
                    placeholder="Twitter Profile Url"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.state.onChange}
                    error={errors.twitter}
                />

                <InputGroup
                    placeholder="Instagram Profile Url"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.state.onChange}
                    error={errors.instagram}
                />

                <InputGroup
                    placeholder="Facebook Profile Url"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.state.onChange}
                    error={errors.facebook}
                />

                <InputGroup
                    placeholder="LinkedIn Profile Url"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.state.onChange}
                    error={errors.linkedin}
                />

                 <InputGroup
                    placeholder="Youtube Profile Url"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.state.onChange}
                    error={errors.youtube}
                />
            </div>
        )
    }else{

    }

    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">
                       Let's get some information to make your profile standout 
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error= {errors.handle}
                            info="Unique handle for profile url . Your full name, company name, nickname, etc"

                        />

                        <SelectListGroup 
                            placeholder="Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            options={options}
                            error= {errors.status}
                            info="Give us an idea of where you are at in your career"
                        />

                        <TextFieldGroup 
                            placeholder="Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error= {errors.company}
                            info="Could be your own company or where you are working"

                        />

                        <TextFieldGroup 
                            placeholder="Website"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            error= {errors.website}
                            info="Could be your own website or a company one"

                        />

                        <TextFieldGroup 
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error= {errors.location}
                            info="City or city & state suggested"
                        />

                        <TextFieldGroup 
                            placeholder="Skills"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error= {errors.skills}
                            info="Please use comma seperated values (Java, PHP , C etc) "
                        />

                        <TextFieldGroup 
                            placeholder="Github Username"
                            name="githubusername"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error= {errors.githubusername}
                            info="If you want your latest repos and a Gihub Link, include your resume"
                        />

                        <TextAreaFieldGroup 
                            placeholder="Short Bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error= {errors.bio}
                            info="Tell us a little about yourself"
                        />
                        
                        <div className="mb-3">
                            <button className="btn btn-light" onClick={(e) => {
                                e.preventDefault();
                                this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                }))
                            }} >Add Social Network links</button>
                            <span className="text-muted"> Optional</span>
                        </div>

                        {socialInputs}
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />        

                    </form>
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapsStateToProps = (state) =>({ 
    profile: state.profile,
    errors: state.errors
})

export default connect(mapsStateToProps,{createProfile})(withRouter(CreateProfile))