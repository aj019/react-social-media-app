import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import {getAllProfiles} from '../../actions/profileActions'
import ProfilesItem from './ProfilesItem'
class Profiles extends Component {

  componentDidMount(){
      this.props.getAllProfiles();
  }  

  render() {

    const {profilesLoading, profiles} = this.props.profile;
    let profileItems;

    if(profiles === null || profilesLoading){
        profileItems = <Spinner />
    }else{
        if(profiles.length > 0){
           profileItems = profiles.map(profile => <ProfilesItem key={profile._id} profile={profile} />)
        }else{
            profileItems = <h4>No Profile Here</h4>
        }
    }

    return (
        <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>
              {profileItems}
            </div>
         </div>
        </div>
        </div>      
    )
  }
}

Profiles.propTypes = {
    profilesLoading: PropTypes.bool,
    getAllProfiles: PropTypes.func
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getAllProfiles})(Profiles);