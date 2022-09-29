import React, {useState,useEffect} from 'react';
import {Button,Nav,Container,Card,Row,Col,Table, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import DeleteReservation from '../components/DeleteReservation';

const Styled = styled.div`
 
    /* background-color: #CAD2C5;
    padding: 40px;
     */

    /* .btn{
        background-color: #2F3E46;
        color: white;
    }
    
    .btn:hover{
        background-color: #354F52;
        cursor:pointer;
        opacity: 0.9;
        transform:scale(0.98);
    } */

    /* .custom-container{
        background-color: #84A98C;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
        border-radius: 5px;
        border:none;
    } */

    /* .row{
        padding:5px;
    }

    &{
        color:white;   
    }
    a{
        color:white;
    } */

`

function GroupSchedule() {
    const [message, setMessage] = useState('');
    const [response,getResponse] = useState([])
    const [myobj,setmyobj] = useState({})

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // useEffect to call function
     useEffect(()=>{
        getSchedule();
     },[])



    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

    console.log('local Storage info ' + ud.firstname + ' ' + ud.lastname + ' ' + ud._id);

    const getSchedule = async event => {
        //event.preventDefault();
 

        let obj = { userid: ud._id };

        console.log(obj);
        let js = JSON.stringify(obj);


        console.log('js: ' + js);
        
        try {
            const response = await fetch(bp.buildPath('api/getreservation'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
                
                
                let res = JSON.parse(await response.text());
                console.log(res);



                // turn res into an array
                let test = [res].flat();
                console.log('test');
                console.log(test);

                console.log('response');
                console.log(res);

                if(res.message === 'No Reservation Found'){
                    return;
                }else{
                    getResponse(test);
                }

                

                console.log(res.professorlist[0])

                setmyobj(res);

            if (ud._id <= 0) {
                setMessage('User/Password combination incorrect');
                return;
            }

        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };


    const deleteReservation = async event => {

        let obj={userid: ud._id}
        let js = JSON.stringify(obj);

        try{
            const response = await fetch(bp.buildPath('api/deletereservation'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' }});

            let res = JSON.parse(await response.text());

            if(res.message === 'No Reservations Found'){
                return;
            }

            handleShow()

            console.log('res from deleteReservation');
            console.log(res);
        }catch (e) {
            alert(e.toString());
            return;
        }
    }


    const column = [
        {heading: 'Month', value: 'month'},
        {heading: 'Day', value:'day'},
        {heading: 'Timeslot', value:'timeslot'},
        {heading: 'Professors',value:'professorlist'}
    ]


const TableHeadItem = ({item}) => <th>{item.heading}</th>

const TableRow = ({item, column}) =>(
    <tr key={item}>
        {column.map((columnItem)=>{
            return <td>{item[`${columnItem.value}`]}</td>
        })}
    {/* <Button onClick={()=>{deleteReservation();}} style={{backgroundColor:'red', width:'100%'}}>Cancel</Button> */}
     <DeleteReservation />
    </tr>
    )
  return (
    <>
    <Styled>
    <Card className= 'mt-4'>
        <Table striped bordered hover>
            <thead>
            <tr>
                {column.map((item,index)=><TableHeadItem item={item}/>)}
            </tr>
            </thead>
            <tbody>
                {response.map((item, index) => <TableRow item={item} column = {column}/>)}
            </tbody>
        </Table>
    </Card>

    <Container>
    <Alert show={show} onHide={handleClose} variant="primary" style={{ margin:'auto', textAlign: "center", width:'50%'}}>
      <Alert.Heading>Appointment Has Been Canceled!!!</Alert.Heading>
    </Alert>
    </Container>
    </Styled>
    </>
  )
}


export default GroupSchedule
