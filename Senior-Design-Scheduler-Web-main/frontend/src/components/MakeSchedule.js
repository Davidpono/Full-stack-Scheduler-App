import React, {useState, useEffect } from 'react';
import {Button,Container,Card,Table,Form,Alert,Accordion,Row,Col} from 'react-bootstrap';
import styled from 'styled-components';
import SetReservedTime from './SetReservedTime.js';

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
function MakeSchedule() {

    var pickMonth;
    var pickDay;
    var pickDayOfWeek = 0;

    var t1 = '9:00';
    var t2 = '10:30';
    var t3 = '12:00';
    var t4 = '1:30';
    var t5 = '3:00';
    var t6 = '4:30';
    var t7 = '6:00';
    var t8 = '7:30';
    
    // initialize response as an empty array
    const [response,setResponse] = useState([]);    
    const [pickProfessors,setpickProfessor] = useState([]);
    const [timeSlotReserved, setTimeSlot] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [timeslot1, settimeslot1] = useState([]);
    const [timeslot2, settimeslot2] = useState([]);
    const [timeslot3, settimeslot3] = useState([]);
    const [timeslot4, settimeslot4] = useState([]);
    const [timeslot5, settimeslot5] = useState([]);
    const [timeslot6, settimeslot6] = useState([]);
    const [timeslot7, settimeslot7] = useState([]);
    const [timeslot8, settimeslot8] = useState([]);

    const [pickedprofessor1, setProfessor1] = useState({});
    const [pickedprofessor2, setProfessor2] = useState({});
    const [pickedprofessor3, setProfessor3] = useState({});

    // this is Each index of professors for each timeslot
    const [p1, setP1] = useState([]);
    const [p2, setP2] = useState([]);
    const [p3, setP3] = useState([]);
    const [p4, setP4] = useState([]);
    const [p5, setP5] = useState([]);
    const [p6, setP6] = useState([]);
    const [p7, setP7] = useState([]);
    const [p8, setP8] = useState([]);

    const [myObj, setMyObj] = useState({});
    
    let bp = require('./Path.js');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
   // console.log(ud._id);
    

    const seeSchedule = async event =>{
        event.preventDefault();

        if(pickDay.value > 5 || pickDay.value === undefined || pickDay.value === 0){
            console.log('ERROR!');
            return;
        }
        if(pickDayOfWeek.value > 5 || pickDay.value === undefined ||pickDay.value === 0){
            console.log('ERROR!');
            return;
        }
        if(pickMonth.value > 12 || pickMonth.value === undefined || pickMonth.value === 0){
            console.log('Error!');
            return;
        }

        const day =[
            {
              "month": parseInt(pickMonth.value),
              "day": parseInt(pickDay.value),
              "year": 2022,
              "dayofweek":  parseInt(pickDayOfWeek.value)
            }
          ]

        const toSetReservedTimes = {

            professor1: '',
            professor2: '',
            professor3: '',
            month: pickMonth.value, 
            day:pickDay.value, 
            year: 2022,
            dayofweek: pickDayOfWeek.value, 
            timeslot: '', 
            userid: ud._id, 
            title: '', 
            summary: '',

        }

        setMyObj(toSetReservedTimes);
    
        let obj = {dates:day};
        let js = JSON.stringify(obj);

        try{
            const response = await fetch(bp.buildPath('api/getavailabletimes'),
                {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
            
            let res = JSON.parse(await response.text());
            
            var professors = res.availableTimes[0];

            // console.log('professors');
            
            // professors.map((element)=>{
            //     console.log(element);
            // })

            
            
            // console.log(professors[0]);
            // if(professors[0].length === 0){
            //     professors[0] = [{name:'', id:''}];
            // }


            // console.log(professors[1]);
            // console.log(professors[2]);
            // console.log(professors[3]);
            // console.log(professors[4]);

            for(let i = 0; i < professors.length;i++){
                if(professors[i].length === 0){
                    professors[i].push({name: '', id: ''})
                    professors[i].push({name: '', id: ''})
                    professors[i].push({name: '', id: ''})
                }
            }

            console.log("proessors filtered");
            console.log(professors)

     

            // var finalarray;

            // // filter
            // for(let i = 0; i < professors.length;i++){
            //     for(let j = 0; j < professors[i].length;j++){
            //         if(j<3){
            //             finalarray[i].push(professors[j])
            //         }
            //     }
            // }

            // console.log('\n\n');
            // console.log(finalarray);


            // Filter out empty elements.
            // for(let i = 0; i < professors.length;i++){
            //     for(let j = 0; j < professors[i].length; j++){
            //         // if(professors[i][j].name === undefined || professors[i][j].id === undefined){
            //         //     professors[i][j].name = '';
            //         //     professors[i][j].id = '';
            //         // }
            //         if(professors[i].length === 0){
            //             professors[i].push([{name: '', id: ''}]);
            //         }
            //     }
            // }

            console.log('professors2');
            console.log(professors);


            setP1(professors[0]);
            setP2(professors[1]);  
            setP3(professors[2]);
            setP4(professors[3]);
            setP5(professors[4]);
            setP6(professors[5]);
            setP7(professors[6]);
            setP8(professors[7]);

            console.log('p1');
            console.log(p1[0]);
           
            console.log("professors")
            setpickProfessor(professors);
     
            // set each time slot for professors
            settimeslot1(professors[0]);
            settimeslot2(professors[1]);
            settimeslot3(professors[2]);
            settimeslot4(professors[3]);
            settimeslot5(professors[4]);   
            settimeslot6(professors[5]);
            settimeslot7(professors[6]);
            settimeslot8(professors[7]);

            // // var times = [1,2,3,4,5,6,7,8];
            // var prof =[[]];

            // // // filter
            // const filter_array  = professors.filter(element => {
            //     return(element.join('').length!==0)
            // })

            // for(let i = 0; i < filter_array.length;i++){
            //     prof.push([i])
            //     for(let j = 0; j < filter_array[i].length;j++){
            //         if(j<3){
            //             prof[i][j] = filter_array[i][j].name;   
            //         }else{
            //             ;
            //         }
            //     }
            // }

            // console.log('\n\n');
            //console.log(prof);


            //console.log('profArray');
           // prof.pop();
            //console.log(prof);
           // var someobj = {}

            // times.forEach((element,index)=>{
            //     someobj[element] = prof[index];
            // })

            // let t = [someobj].flat();
            
            // console.log('t');
            // console.log(t);
            // setResponse(t);


            // console.log('prof');
            // console.log(prof);


        }catch (e){
            alert(e.toString());
            return;
        }
    }


    function set_up_api(){

        var professor1;
        var professor2;
        var professor3;

        if(timeSlotReserved === 1){
            setTimeSlot('9:00');

            if(timeslot1[0].name === undefined || timeslot1[0].length === 0){
                timeslot1[0] = {name:'',id:''}
            }else{
            professor1 = {
                name:timeslot1[0].name,
                id: timeslot1[0].id
            }

            professor2 = {
                name:timeslot1[1].name,
                id: timeslot1[1].id
            }
            
            professor3 = {
                name:timeslot1[2].name,
                id: timeslot1[2].id
            }

            setProfessor1(professor1);
            setProfessor2(professor2);
            setProfessor3(professor3);
            
            console.log('3 professors');
            console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
            setReservedTime();

        }
            
        
        }
        if(timeSlotReserved === 2){
           
            setTimeSlot('10:30');

           if(timeslot2[0].length === 0 || timeslot2[1].length === 0 || timeslot2[2].length === 0){
                timeslot2[0] = {name:'',id:''}
                timeslot2[1] = {name:'',id:''}
                timeslot2[2] = {name:'',id:''}
            }else{

                professor1 = {
                    name:timeslot2[0].name,
                    id: timeslot2[0].id
                }

                professor2 = {
                    name:timeslot2[1].name,
                    id: timeslot2[1].id
                }
                
                professor3 = {
                    name:timeslot2[2].name,
                    id: timeslot2[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);
                
                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
                setReservedTime();
            }

        }

        if(timeSlotReserved === 3){
            setTimeSlot('12:00');
            if(timeslot3[0].length === 0 || timeslot3[1].length === 0|| timeslot3[2].length === 0){
                timeslot3[0] = {name:'',id:''}
                timeslot3[1] = {name:'',id:''}
                timeslot3[2] = {name:'',id:''}
            }else{
                professor1 = {
                    name:timeslot3[0].name,
                    id: timeslot3[0].id
                }

                professor2 = {
                    name:timeslot3[1].name,
                    id: timeslot3[1].id
                }
                
                professor3 = {
                    name:timeslot3[2].name,
                    id: timeslot3[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);
                
                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
                setReservedTime();
            }
        }

        if(timeSlotReserved === 4){
            setTimeSlot('1:30');

            if(timeslot4[0].length === 0 || timeslot4[1].length === 0|| timeslot4[2].length === 0){
                timeslot4[0] = {name:'',id:''}
                timeslot4[1] = {name:'',id:''}
                timeslot4[2] = {name:'',id:''}
            }else{
                professor1 = {
                    name:timeslot4[0].name,
                    id: timeslot4[0].id
                }

                professor2 = {
                    name:timeslot4[1].name,
                    id: timeslot4[1].id
                }
                
                professor3 = {
                    name:timeslot4[2].name,
                    id: timeslot4[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);
                
                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
                setReservedTime();
            }
        }

        if(timeSlotReserved === 5){
            setTimeSlot('3:00');

            if(timeslot5[0].length === 0 || timeslot5[1].length === 0|| timeslot5[2].length === 0){
                timeslot5[0] = {name:'',id:''}
                timeslot5[1] = {name:'',id:''}
                timeslot5[2] = {name:'',id:''}
            }else{
                professor1 = {
                    name:timeslot5[0].name,
                    id: timeslot5[0].id
                }

                professor2 = {
                    name:timeslot5[1].name,
                    id: timeslot5[1].id
                }
                
                professor3 = {
                    name:timeslot5[2].name,
                    id: timeslot5[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);

                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
                setReservedTime();
            }
        }

        if(timeSlotReserved === 6){
            setTimeSlot('4:30');

            if(timeslot6[0].length === 0 || timeslot6[1].length === 0|| timeslot6[2].length === 0){
                timeslot6[0] = {name:'',id:''}
                timeslot6[1] = {name:'',id:''}
                timeslot6[2] = {name:'',id:''}
            }else{
                professor1 = {
                    name:timeslot6[0].name,
                    id: timeslot6[0].id
                }

                professor2 = {
                    name:timeslot6[1].name,
                    id: timeslot6[1].id
                }
                
                professor3 = {
                    name:timeslot6[2].name,
                    id: timeslot6[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);

                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
                setReservedTime();
            }
        }

        if(timeSlotReserved === 7){
            setTimeSlot('6:00');

            if(timeslot7[0].length === 0 || timeslot7[1].length === 0|| timeslot7[2].length === 0){
                timeslot7[0] = {name:'',id:''}
                timeslot7[1] = {name:'',id:''}
                timeslot7[2] = {name:'',id:''}
            }else{
                professor1 = {
                    name:timeslot7[0].name,
                    id: timeslot7[0].id
                }

                professor2 = {
                    name:timeslot7[1].name,
                    id: timeslot7[1].id
                }
                
                professor3 = {
                    name:timeslot7[2].name,
                    id: timeslot7[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);

                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);
                setReservedTime();
            }
        }
        if(timeSlotReserved === 8){
            setTimeSlot('7:30');

            if(timeslot8[0].length === 0 || timeslot8[1].length === 0|| timeslot8[2].length === 0){
                timeslot8[0] = {name:'',id:''}
                timeslot8[1] = {name:'',id:''}
                timeslot8[2] = {name:'',id:''}
            }else{
                professor1 = {
                    name:timeslot8[0].name,
                    id: timeslot8[0].id
                }

                professor2 = {
                    name:timeslot8[1].name,
                    id: timeslot8[1].id
                }
                
                professor3 = {
                    name:timeslot8[2].name,
                    id: timeslot8[2].id
                }

                setProfessor1(professor1);
                setProfessor2(professor2);
                setProfessor3(professor3);

                console.log('3 professors');
                console.log(pickedprofessor1.id + " " + pickedprofessor2.id + " " + pickedprofessor3.id);

                setReservedTime();
            }
        }
    

    }

    // call reservetime api
    const setReservedTime = async event =>{
        
        let obj = {
            professor1: pickedprofessor1.id, 
            professor2: pickedprofessor2.id, 
            professor3: pickedprofessor3.id, 
            month: pickMonth.value, 
            day:pickDay.value, 
            year: 2022,
            dayofweek: pickDayOfWeek.value, 
            timeslot: timeSlotReserved, 
            userid: _ud._id, 
            title: '', 
            summary: '',
        };
        
        console.log('object!!!!');
        console.log(obj);

        let js = JSON.stringify(obj);
        
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

<Container className = 'outer-container'>
    <Card className = 'formCard m-0 p-0' style={{border:'2px #354F52'}}>
    <Form>
        <Form.Group>
            <div className = 'formLabel'>
            <Card.Header style = {{color:'white',backgroundColor: '#354F52', borderBottom: '2px solid black'}}>Enter Search Information</Card.Header>
            </div>
            <div className = 'formInput'>
            <Form.Control type='text' placeholder = 'Month' ref={(c) => pickMonth = c}></Form.Control>
            <Form.Control type='text' placeholder = 'Day' ref={(c) => pickDay = c}></Form.Control>
            <Form.Control type='text' placeholder = 'Day of Week' ref={(c) => pickDayOfWeek = c}></Form.Control>
            <Button type="submit" onClick={seeSchedule}>Submit</Button>
            </div>
        </Form.Group>
    </Form>
    </Card>
</Container>

<Container style = {{paddingLeft: '50px'}}className = 'inner-container' >
    <Card style = {{marginLeft: '2px',width:'100%'}} className= 'card1'>  
    
    <Table className = 'mytable' striped bordered hover>
    
    <thead>
        <tr>
            <td>9:00</td>
            <td>10:30</td>
            <td>12:00</td>
            <td>1:30</td>
            <td>3:00</td>
            <td>4:30</td>
            <td>6:00</td>
            <td>7:30</td>
        </tr>
    </thead>
    
    <tbody>
    
        <tr>
            <td>               
                {p1.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>

            <td>
                {p2.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>
        
            <td>               
                {p3.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>
                
            <td>
                {p4.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>
                    
            <td>               
                {p5.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>
                    
            <td>
                {p6.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>
        
            <td>               
                {p7.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>
                    
            <td>
                {p8.map(e =>{
                return <ul><li>{e.name}</li></ul>
                })}
            </td>

        </tr>
    </tbody>
        <tfoot>
            <td><SetReservedTime professors = {p6} time={1} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={2} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={3} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={4} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={5} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={6} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={7} info={myObj}/></td>
            <td><SetReservedTime professors = {p6} time={8} info={myObj}/></td>
        </tfoot>

    </Table>
    </Card>
</Container>

</Style>
<Style>
<Container>
    <Alert show={show} onHide={handleClose} variant="primary" style={{ margin:'auto', textAlign: "center", width:'50%'}}>
      <Alert.Heading>Confirm time Slot!</Alert.Heading>
      <hr/>
      <div className = "d-flex justify-content-end">
        <Button onClick = {()=> {setShow(false); set_up_api();}}>Confirm!!</Button>
      </div>
    </Alert>
</Container>
</Style>
</>
  )
}

// const TableHeadItem = ({item}) => <th>{item.heading}</th>

//  const TableRow = ({item, column}) =>(

//     <tr>
//         {column.map((columnItem)=>{
//             // console.log(item[columnItem.value])
//             return <td className = 'mytd'><li>{item[`${columnItem.value}`]}</li></td>
//         })}
//     </tr>
//  )
export default MakeSchedule
