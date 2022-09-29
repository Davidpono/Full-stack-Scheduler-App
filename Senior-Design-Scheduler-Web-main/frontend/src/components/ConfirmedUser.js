import React, {useEffect} from 'react'
import {Container,Card} from 'react-bootstrap';
import styled from 'styled-components';

const Styled = styled.div`
 
    background-color: #CAD2C5;
    padding: 20px;
    color:black;

    .custom-container{
        width:50%;
    }

`

function ConfirmedUser() {
    useEffect(()=>{
        const interval = setInterval(()=>{
            window.location.href = '/';

        },5000)
    },[])


  return (

<Styled>
    <Container className= "custom-container bg-light p-4 align-content-center align-items-center justify-content-center">
        <Card>
            <Card.Header style = {{backgroundColor:'#84A98C',fontSize: '30px',textAlign:'center', color:"black"}}>Your Account has been Confirmed!</Card.Header>
            <Card.Body>
                <Card.Text style = {{fontSize: '20px',textAlign:'center', color:"black"}}>
                    You'll be Redirected to the main page
                </Card.Text>
            </Card.Body>
        </Card>
    </Container>
</Styled>
  )
}

export default ConfirmedUser
