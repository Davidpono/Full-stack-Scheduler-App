import React from 'react';
import {Button,Nav,Container,Card,Row,Col,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoggedInName()
{
    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
  
    let firstName = ud.firstname;
    let lastName = ud.lastname;

    console.log('local Storage info ' + ud.firstname + ' ' + ud.lastname);


    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(

    <>
    <Card style={{backgroundColor:'#2F3E46', textAlign:'left', color:'white'}}>
      <Container variant={'light'} style={{fontSize: '20px', textAlign:'left', margin: '0px'}}>
        <Row>
          <Col style={{fontSize: '25px', textAlign:'left'}} className="justify-content-left" lg={6}>Logged in as {firstName} {lastName}</Col>
          <Col style={{fontSize: '35px', textAlign:'center'}}  className="justify-content-center" lg={6}>mySDSchedule</Col>
        </Row>
      </Container>
    </Card>
     
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item className = 'home bg-secondary'>
        <Nav.Link style={{color: 'white', fontSize: '20px'}} href="/group13-project2/Student">Home</Nav.Link>
      </Nav.Item>

      <Nav.Item className = 'link-1 bg-secondary'>
        <Nav.Link style={{color: 'white', fontSize: '20px'}} href="/group13-project2/MakeSchedule">Pick Schedule</Nav.Link>
      </Nav.Item>
      
      <Nav.Item className = 'link-3 bg-secondary'>
        <Nav.Link style={{color: 'white', fontSize: '20px'}} eventKey="link-3" onClick={doLogout}>Log Out</Nav.Link>
      </Nav.Item>
    </Nav>

   </>
  );

};

export default LoggedInName;