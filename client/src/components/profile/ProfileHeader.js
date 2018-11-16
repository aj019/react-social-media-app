import React, { Component } from 'react'
import isEmpty from '../../validations/is-empty'
import {Link} from 'react-router-dom'
class ProfileHeader extends Component {
  render() {

    const {profile} = this.props;
    return (
      <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.handle}</h1>
                  <p className="lead text-center">{profile.status} at {isEmpty(profile.company) ? null : (<span>{profile.company}</span>)}</p>
                  {isEmpty(profile.location) ? null : (<p>{profile.location}</p>)}
                  <p>
                  {isEmpty(profile.website) ? null : (<Link className="text-white p-2" to={profile.website}>
                      <i className="fas fa-globe fa-2x"></i>
                    </Link>)}
                    
                    <Link className="text-white p-2" to="#">
                      <i className="fab fa-twitter fa-2x"></i>
                    </Link>
                    <Link className="text-white p-2" to="#">
                      <i className="fab fa-facebook fa-2x"></i>
                    </Link>
                    <Link className="text-white p-2" to="#">
                      <i className="fab fa-linkedin fa-2x"></i>
                    </Link>
                    <Link className="text-white p-2" to="#">
                      <i className="fab fa-instagram fa-2x"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

    )
  }
}

export default ProfileHeader;