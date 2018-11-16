import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class ProfileGithub extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientId: 'faa8799bb29c5b0cc930',
      clientSecret: '3e3286a728bff42748a16479ba98fc8f0045d2f9',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount(){
    const {githubusername} = this.props.profile;
    const {count,clientId,clientSecret,sort,repos} = this.state;
    console.log('Username',githubusername,clientId,clientSecret);
    fetch(`http://api.github.com/users/${githubusername}/repos?per_page=${count}&client_id=${clientId}&clientSecret=${clientSecret}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({
              repos: data
            })
          })
          .catch(err => console.log(err));

  }

  render() {

    const {repos} = this.state;
    const repoItem = repos.map((repo,index) => (
      <div className="row" key={index}>
                <div className="col-md-6">
                  <h4>
                    <a href={repo.html_url}  className="text-info" target="_blank">{repo.name}</a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                    Stars: {repo.stargazers_count}
                  </span>
                  <span className="badge badge-secondary mr-1">
                    Watchers: {repo.watchers_count}
                  </span>
                  <span className="badge badge-success">
                    Forks: {repo.forks_count}
                  </span>
                </div>
              </div>
    ))

    return (
      <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            <div className="card card-body mb-2">
              {repoItem}
            </div>
          </div>
    )
  }
}

export default ProfileGithub;