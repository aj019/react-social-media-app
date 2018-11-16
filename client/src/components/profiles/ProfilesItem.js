import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import isEmpty from '../../validations/is-empty'

class ProfilesItem extends Component {
  render() {

    const {profile} = this.props;  

    return (
      <div className="card card-body bg-light mb-3">
            <div className="row">
              <div className="col-2">
                <img className="rounded-circle" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
              </div>
              <div className="col-lg-6 col-md-4 col-8">
                <h3>{profile.user.name}</h3>
                <p>{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
              </div>
              <div className="col-md-4 d-none d-lg-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                  {profile.skills.map(skill => (<li className="list-group-item"><i className="fa fa-check pr-1"></i>{skill}</li>))}  
                </ul>
              </div>
            </div>
          </div>
    )
  }
}

ProfilesItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfilesItem;