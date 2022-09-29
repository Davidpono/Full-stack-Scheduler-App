import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #52796F;
    }

    .navbar-brand, .navbar-nav .nav-link{
        color: #2f3e46;
    }

    &:hover{
        color:white;
    }

`

const NavBar = () => {
    // use Styles Div to wrapp everything
    // large navbar
    <Styles>
        
        <Navbar expand="lg">
            <Navbar.Brand href="/">Code Life</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav className='ml-auto'>
                    <Nav.Item><Nav.Link href="/group13-project2/Student">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                </Nav>
        </Navbar>

    </Styles>
}

export default NavBar;