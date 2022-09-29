
import React, {useState, useEffect } from 'react';
import {Button,Modal} from 'react-bootstrap';
import styled from 'styled-components';


const Style = styled.div`
    
    padding:10px;
    background-color: #CAD2C5;
    padding-bottom:100px;

    li{
        text-align:left;
        list-style-type:none;
        margin:0;
        padding:0;
    }

    table{
        width:100%;
        margin:0;
        padding-bottom:10px;
        padding-top:0px;
    }

    td{
        
        width: 100px;
    }

    .inner-container{
        margin-top:0px;
        padding:0px;
        width:100%;
    }

    .card1{
        padding:0;
        /* padding:20px 20px 0px 20px; */
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

    .outer-container{
        margin:0px;
        padding:0px;
    }

    .formCard{
        position:absolute;

    }

`

function SetReservedTime({professors, time, info}) {

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const [p1, setp1] = useState('');
    // const [p2, setp2] = useState('');
    // const [p3, setp3] = useState('');

 
    let bp = require('./Path.js');

    const handleCheck = (id) =>{
        console.log(`key: ${id}`);

        
    }
    
    // var PickedProfessors2 = []

    // const handleSubmit = (id) =>{

    //     PickedProfessors2.push(id);
    //     console.log('myProfessors');
    //     console.log(PickedProfessors2);

    //     setp1(PickedProfessors2[0]);
    //     setp2(PickedProfessors2[1]);
    //     setp3(PickedProfessors2[2]);
    // }

    const setReservedTime = async event =>{

        info.professor1 = professors[0].id;
        info.professor2 = professors[1].id;
        info.professor3 = professors[2].id;
        info.timeslot = time;
        
        console.log('object!!!!');
        console.log(info);

        let js = JSON.stringify(info);
        
        console.log(js);

        try{
            const response = await fetch(bp.buildPath('api/reservetime'),
                {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
            
            let res = JSON.parse(await response.text());
            console.log('res passing in ');
            console.log(res);
            

        }catch (e){
            alert(e.toString());
            return;
        }
    }
  return (
<>
    <Style>
        <Button variant="primary" onClick={setReservedTime}>
           Pick Time Slot
        </Button>

        {/* <form> */}
        {/* <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {/* {p}        */}
       
                {/* <ul> */}
            {/* {professors.map((e) =>
            <li key={e.id}>{e.name} 
                <input 
                    type='checkbox'
                    onChange={() => handleCheck(e.id)} 
                    key = {e.id}></input>
                    <Button key = {e.id}
                        onClick={() => handleSubmit(e.id)}>Add</Button>
                    </li>
            )}
        </ul> */}
         
            

{/* 
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" >
                Close
            </Button>
            <Button variant="primary"  >Understood</Button>
            </Modal.Footer>
        </Modal> */} 

        {/* </form> */}


    </Style>
</>
      
  )
}

export default SetReservedTime
