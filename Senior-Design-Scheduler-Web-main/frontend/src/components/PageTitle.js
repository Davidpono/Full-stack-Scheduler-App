import React from 'react';
import {Container,Card} from 'react-bootstrap';
import styled from 'styled-components';
// import 'bootstrap/dist/css/bootstrap.min.css';
function PageTitle()
{
   return(

    //  <h1 id="title">COP 4331 Group 13 MERN Stack Summer 2022</h1>
    <Card style={{backgroundColor:'#2F3E46', color:'white'}}>
      <div id = "title">
    <Container style={{fontSize: '40px', textAlign:'center'}}>
    mySDSchedule
    </Container>
    </div>
    </Card>
   );
};

export default PageTitle;
