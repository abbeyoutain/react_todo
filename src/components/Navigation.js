import React from 'react';
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navigation.css'

export default function Navigation() {
    const {currentUser, authenticate, logout} = useAuth();
  return (
      <Navbar expand="md" className="p-3">
          <Navbar.Brand id="websiteTitle" href="/">Busy Bee To-Do App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
              <Nav className="mr-auto">
                {currentUser &&
                <>
                  <Link to="/todos" className="nav-link text-white">To-Dos</Link>
                  <Link to="/categories" className="nav-link text-white">Categories</Link>
                </>
                }
              {currentUser ?
                  <Nav.Link onClick={() => logout()} id="loginButton">Logout</Nav.Link>
                  :
                  ""
                  // <Nav.Link onClick={() => authenticate()} id="loginButton">Login</Nav.Link>
              }
              </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
}
