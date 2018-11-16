import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import {Provider} from 'react-redux';
import NavBar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/layout/Footer'
import store from './store'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import {clearCurrentProfile} from './actions/profileActions'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
//Check for token

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set Current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //If Token expired logout user
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
      store.dispatch(logoutUser());
  
  //TODO: Clear profile
    store.dispatch(clearCurrentProfile());
  //Redirect To Login
  window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <Router>
          <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container"> 
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>  
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>  
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch> 
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>  
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch> 
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>  
            </div> 
          <Footer />
          </div>
        </Router> 
      </Provider> 
    );
  }
}

export default App;
