import React from 'react';
import {Container,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function PageTitle()
{
   return(

    //  <h1 id="title">COP 4331 Group 13 MERN Stack Summer 2022</h1>
    <Card style={{backgroundColor:'#333'}}>
      <div id = "title">
    <Container variant={'light'} style={{fontSize: '40px', textAlign:'center'}}>
      
    </Container>
    </div>
    </Card>
   );
};

export default PageTitle;
