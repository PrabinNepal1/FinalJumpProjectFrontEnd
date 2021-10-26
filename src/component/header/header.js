import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Container, Nav, Navbar, Alert} from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function Header(){

    const [error, setError] = useState("")
    const {currentUser, logout, isLoggedIn} = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')
        try{
          await logout()
          history.push('/')
        }catch{
          setError("Failed to log out!")
  
        }
  
      }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link to="/">PLEY</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link> <Link to="/Resturant">Restaurants</Link></Nav.Link>
                        <Nav.Link  href="#AboutUS">About Us</Nav.Link>
                        <Nav.Link  href="#ContactUS">Contact Us</Nav.Link>
                        </Nav>
                        {currentUser ? (<Nav>
                            <Nav.Link> <Link to="/User">Your Profile</Link></Nav.Link>
                            <Nav.Link> <Link to="/" onClick={handleLogout}>Logout</Link></Nav.Link>
                         </Nav>):
                         (<Nav>
                                <Nav.Link> <Link to="/Login">Login</Link></Nav.Link>
                                <Nav.Link> <Link to="/Signup">Signup</Link></Nav.Link>
                         </Nav> )
                         }
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {error &&  <Alert variant="danger">{error}</Alert>}
        </>
    )
}

export default Header;