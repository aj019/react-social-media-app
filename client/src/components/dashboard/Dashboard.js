import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions'
import classnames from 'classnames';
import Spinner from '../common/Spinner'
import {Link} from  'react-router-dom'
import ProfileActions from './ProfileActions'
class Dashboard extends Component {

  componentDidMount(){
      this.props.getCurrentProfile();
  }  

  onDeleteClick = () => {
      this.props.deleteAccount();
  }
  render() {

    const {user} = this.props.auth;
    const {profile,loading} = this.props.profile;
    let dashboardContent;
    
    if(profile === null || loading){
        dashboardContent  = <Spinner />
    }else{
        if(Object.keys(profile).length > 0){
            //TODO : Display Profile
            dashboardContent = <div>
                <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                <ProfileActions />
                { /* Exp and Edu */}    
                <div style={{marginBottom:'60px;'}} >
                    <button onClick={() => this.onDeleteClick()} className="btn btn-danger">Delete Account</button>
                </div>
            </div>
        }else{
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p> You have not addded any info yet, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            );
        }
    }

    return (
      <div classnames="dashboard">
          <div className="container">
            <div className="row">
                <div className="col-md-12" >
                    <h1 className="display-4">Dashboard</h1>
                    {dashboardContent}
                </div>
            </div>
          </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile,
    auth : state.auth
});

export default connect(mapStateToProps ,{getCurrentProfile, deleteAccount})(Dashboard)
