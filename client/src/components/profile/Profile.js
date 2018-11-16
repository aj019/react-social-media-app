import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCred from './ProfileCred'
import ProfileGithub from './ProfileGithub'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../common/Spinner'
import {getProfileByHandle} from '../../actions/profileActions'


class Profile extends Component {

  componentDidMount(){
    if(this.props.match.params.handle)
    this.props.getProfileByHandle(this.props.match.params.handle);
  }

  render() {

    const {profile ,loading}  = this.props.profile;

    let profileContent;

    if(profile === null || loading){
      profileContent = <Spinner />
    }else{
      profileContent = (<div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-6">
                <a href="profiles.html" className="btn btn-light mb-3 float-left">Back To Profiles</a>
              </div>
              <div className="col-6"></div>
           </div>
           {/*Profile Header*/}
           <ProfileHeader profile={profile} />
           {/*Profile About*/}
           <ProfileAbout profile={profile} />
           {/*Profile Credentials*/}
           <ProfileCred profile={profile} />
           {/*Profile Github*/}
           {profile.githubusername ? (<ProfileGithub profile={profile} />) : null}
           
           
        </div>
      </div>
    </div>
   </div>  );
    }
    return (
      <React.Fragment>
           {profileContent}
       </React.Fragment>     
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile : state.profile
})


export default connect(mapStateToProps,{getProfileByHandle})(Profile);