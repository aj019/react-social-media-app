import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import NavBar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Footer from './components/layout/Footer'
import store from './store'

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
            </div> 
          <Footer />
          </div>
        </Router> 
      </Provider> 
    );
  }
}

export default App;
