import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../../store/actions';
import { useNavigate } from "react-router-dom";



export default function Header() {
    const auth = useSelector((state) => state.auth);
    let navigate = useNavigate();

    const dispatch = useDispatch()
    
    const logOut=()=>{
        // navigate("/signin");
        dispatch(signOut())

    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    {/* <span className="nav-link" onClick={logOut}>Signout</span> */}
                    <NavLink to="" className="nav-link" onClick={logOut} >Signout</NavLink>
                </li>
            </Nav>
        )
    }
    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>

        )
    }
    return (
        <>
            <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark"  style={{
                zIndex: 1, marginBottom: '120px'
            }} >
                <Container fluid >
                    <Navbar.Brand >
                        <NavLink to="/" className="navbar-brand">Admin Dashboard</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
