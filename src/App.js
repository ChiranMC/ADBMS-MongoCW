import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component';
import SignUp from './components/signup.component';
import UserDetails from './components/userDetails';
import UserHome from './components/userHome';
import AdminHome from './components/adminHome';
import UpdateUserData from './components/updateUser';

function App() {
  const isLoggedIn =window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              ADBMS CW
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="https://mongodbguide4.blogspot.com/" className="nav-link" >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn==="true"?<UserDetails/>:<Login/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/userHome" element={<UserHome />} />
              <Route path="/adminHome" element={<AdminHome />} />
              <Route path="/updateUser" element={<UpdateUserData/>} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
