import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'
import {withRouter} from 'react-router-dom'

class Education extends Component {


  onDeleteClicked = (expId) => {
       this.props.deleteEducation(expId); 
  }  

  render() {
    const education = this.props.education.map(edu => (
        <tr id={edu._id} key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to !== null ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : 'Now'}</td>
            <td>
                <button className="btn btn-danger" onClick={()=> this.onDeleteClicked(edu._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    console.log(education);

    return (
      <div>
        <h4 class="mb-2">Education Credentials</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                 {education} 
              </tbody>
            </table>    
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(withRouter(Education));
