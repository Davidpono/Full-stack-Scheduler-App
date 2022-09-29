import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Container,Row,Col} from 'react-bootstrap';


function ForgotPassword() {

    let bp = require('./Path.js');

    var email;

    const[message,setMessage] = useState('');

    const RecoverPassword = async event => {
        event.preventDefault();

        let obj = {email:email.value}
        let js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/recovery/sendrecovery'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
      
            let res = JSON.parse(await response.text());
    
            setMessage('Recovery Instructions has been sent to your email.');
            window.location.href = '/';
             
          }
          catch (e) {
              alert(e.toString());
              return;
          }
        
    }

  return (
    <>
    <Container style={{backgroundColor:'#84A98C'}} className= "custom-container p-4 align-content-center align-items-center justify-content-center">
        <h1 style = {{textAlign:'center'}}>Enter a Valid Email</h1>
            <Container style={{backgroundColor: '#33333333', width:'80%'}} className= 'p-4 align-content-center align-items-center justify-content-center'>
                <Form>
                    <Row className = "justify-content-center">
                        <Col lg={4}>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{fontSize:'30px'}} id = "username">Email</Form.Label>
                                <Form.Control  type="text" placeholder="Email" ref={(c) => email = c}/>
                            </Form.Group>
                        </Col>
                    </Row> 
                </Form>

                <Row className = 'justify-content-center'>
                    <Col lg={4}>
                    <Button className = 'btn-submit' style={{width:'49%',marginRight: '1px', marginTop:'4px'}} type='submit' onClick={RecoverPassword} value="Do It">Submit</Button>
                    <Button style={{width:'49%',  marginLeft: '1px', marginTop:'4px'}} type='reset'>Clear</Button><br></br>
                    </Col>
                </Row> 
                <Row>
                    <span>{message}</span>
                </Row>
            </Container>
        </Container>

    </>

      
    
  )
}

export default ForgotPassword
