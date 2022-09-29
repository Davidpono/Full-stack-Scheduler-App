import React, {useState} from 'react'
import {Form,Button,Container,Row,Col, Modal, Table} from 'react-bootstrap';
import styled from 'styled-components';


const Styled = styled.div`
    background-color: #84A98C;

    a{
        color:white;
    }

    .btn{
        background-color: #2F3E46;
        width:100%;
        color: white;
    }
    
    .btn:hover{
        background-color: #354F52;
        cursor:pointer;
        opacity: 0.9;
        transform:scale(0.98);
    }

    li{
        text-align:left;
        list-style-type:none;
        margin:0;
        padding:0;
    }




    
`

function ConfirmTimeSlot({prop, t1}) {

  var info = {prop};
  var t = {t1};

  console.log('info');
  console.log(info.prop[0]);

  console.log('time');
  console.log(t);


  info.prop.map((e)=>{
    console.log(e.name);
  })

    let bp = require('./Path.js');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



  return (
<>
<Styled>
  <Button onClick={handleShow}>Pick Time Slot</Button>
  
  <Container className="p-4 register-container align-content-center align-items-center justify-content-center">
    <Modal className='p-5' show={show} onHide={handleClose}>
      <Modal.Header style={{backgroundColor: '#354F52', borderBottom: '2px solid black'}} closeButton>

        <Modal.Title style={{color: 'white'}}>Confirm Time Slot {t.t1}</Modal.Title>

        </Modal.Header>

        <Modal.Body  style={{backgroundColor: '#CAD2C5'}}>
            <Container className = 'mbc p-4' style={{margin:'2px' ,backgroundColor:'#84A98C'}}>

              {/* <Row> */}
                  
         
                  {/* {info.prop[0].name} */}
                {/* <Row>
                  <Col> */}
                <Table className = 'mytable' style ={{width:'100%'}}>
                  <tr  style ={{width:'100%'}}>
                      
                  { info.prop.map((e)=>{
                    return  <td style={{fontSize:'25px'}}>{e.name}</td>;
                    })}
                    
                  </tr>
                </Table>

                  {/* </Col>
                </Row>
              </Row> */}




              <Row className = 'justify-content-center'>
                  <Col lg={4}>
                      {message}
                  </Col>    
              </Row>
            </Container>
        </Modal.Body>

        <Modal.Footer style={{backgroundColor: '#354F52', borderTop: '2px solid black'}}>
            <Row>
              <Col lg={6}>
                <Button style ={{backgroundColor:'#52796F'}}>
                    Confirm
                </Button>
                </Col>

              <Col lg={6}>
                <Button style ={{backgroundColor:'#52796F'}} onClick={handleClose}>
                    Close
                </Button>
              </Col>

            </Row>

        </Modal.Footer>
    </Modal>

</Container>


</Styled>
    
</>


  )
}

export default ConfirmTimeSlot
