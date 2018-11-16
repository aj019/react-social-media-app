import React, { Component } from 'react'
import Moment from 'react-moment'

class ProfileCred extends Component {
  render() {

    const {profile} = this.props;
    return (
      <div className="row">
            <div className="col-md-6">
              <h3 className="text-center text-info">Experience</h3>
              <ul className="list-group">
                {profile.experience.map((exp,index) => (
                  <li className="list-group-item" key={index}>
                  <h4>{exp.company}</h4>
                  <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to !== null ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : 'Now'}</p>
                  <p>
                    <strong>Position:</strong> {exp.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {exp.description}</p>
                </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="text-center text-info">Education</h3>
              <ul className="list-group">
                {profile.education.map((edu,index) => (
                  <li className="list-group-item" key={index}>
                  <h4>{edu.school}</h4>
                  <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to !== null ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : 'Now'}</p>
                  <p>
                    <strong>Degree: </strong>{edu.degree}</p>
                  <p>
                    <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                  <p>
                    <p>
                      <strong>Description:</strong> {edu.description}</p></p>
                   </li>
                ))}  
                
              </ul>
            </div>
          </div>
    )
  }
}

export default ProfileCred;