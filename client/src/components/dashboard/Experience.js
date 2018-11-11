import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'
import {withRouter} from 'react-router-dom'

class Experience extends Component {


  onDeleteClicked = (expId) => {
       this.props.deleteExperience(expId); 
  }  

  render() {
    const experience = this.props.experience.map(exp => (
        <tr id={exp._id} key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to !== null ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : 'Now'}</td>
            <td>
                <button className="btn btn-danger" onClick={()=> this.onDeleteClicked(exp._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    console.log(experience);

    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                 {experience} 
              </tbody>
            </table>    
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(withRouter(Experience));
