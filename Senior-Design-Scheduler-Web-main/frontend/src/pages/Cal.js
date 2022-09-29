//hook up localstorage    https://stackoverflow.com/questions/71615619/is-there-a-way-to-change-the-color-state-of-a-button-in-react-depending-on-how-e
//consilidate schedules
//check email modal pop up

import React, { useState, useEffect,useRef,Text } from "react";
import '../App.css';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form ,ButtonGroup,Button,Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

let localStorage={
    "firstname": "lickkk",
    "lastname": "maaaa",
    "email": "shit454",
    "_id": "62ddee0c1dbaad608e907811"
  }
let updateobj={

    "_id": "62ddee0c1dbaad608e907811",
    "schedule": {
      "Monday": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "Tuesday": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "Wednesday": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "Thursday": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "Friday": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    }
  }
var v1,v2,v3;
var info;
 var id = '62ddee0c1dbaad608e907811';
console.log(id)
console.log(localStorage._id)

  function Cal() {
    const [response2, setResponse2] = useState({
        "schedule": {
          "Monday": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "Tuesday": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "Wednesday": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "Thursday": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "Friday": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        }
      }
      );


    
    const [response, setResponse] = useState({
        "appointments": [
          {
            "userid": "62b745dd572e55ff2c8aa350",
            "month": 0,
            "day": 0,
            "year": 0,
            "dayofweek": 0,
            "timeslot": 0,
            "title": " ",
            "summary": null
          },
          {
            "userid": "62b8a17281f0274bb31fcc8b",
            "month": 0,
            "day": 0,
            "year": 0,
            "dayofweek": 0,
            "timeslot": 0,
            "title": null,
            "summary": null
          }
        ]
      }
    );
    // useEffect to call function
    useEffect(()=>{
      getSchedule();
      
  },[])
  useEffect(()=>{
    cursche();   
},[])
  const cursche = async event => {

    // event.preventDefault();
   var coollob;
     console.log("HMMM");
     let obj = { _id:id };
     let js = JSON.stringify(obj);
   
     try {
         const response2 = await fetch(('HTTP://localhost:5000/api/getschedule'),
             { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });        
         
        let res = JSON.parse(await response2.text());
         info = JSON.stringify(res);
         console.log(res);
         console.log('info ' + info);
         setResponse2(res);
         
     }
     catch (e) {
         alert(e.toString());
         return;
     }
   };

 
  const updateinformation = async event => {
     
    localStorage.email=v1;
     localStorage.firstname=v2;
     localStorage.lastname=v3;

//overwritelocalstorage
     //event.preventDefault();
   var coollob;
     console.log("HMMM");
     console.log(v1);
     let js2 = JSON.stringify(localStorage);
   
     try {
         const localStorage2 = await fetch(('HTTP://localhost:5000/api/updateinformation'),
             { method: 'POST', body: js2, headers: { 'Content-Type': 'application/json' } });        
             let res = JSON.parse(await localStorage2.text());
         info = JSON.stringify(res);
         console.log(res);
         //console.log('info ' + info);
         //setResponse2(res);
     }
     catch (e) {
         alert(e.toString());
         return;
     }
   };


const getSchedule = async event => {

   // event.preventDefault();
  var coollob;
    console.log("HMMM");
    let obj = { userid:id };
    let js = JSON.stringify(obj);
  
    try {
        const response = await fetch(('HTTP://localhost:5000/api/showappointments'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });        
        let res = JSON.parse(await response.text());
        info = JSON.stringify(res);
        console.log(res);
        //console.log('info ' + info);
        setResponse(res);
    }
    catch (e) {
        alert(e.toString());
        return;
    }
  };

console.log('lettsget it');
const setapi1 = async event => {
    console.log("we did it");
     let js = JSON.stringify(updateobj);
   
     try {
         const response = await fetch(('HTTP://localhost:5000/api/updateschedule'),
             { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });        
         let res = JSON.parse(await response.text());
         info = JSON.stringify(res);
         console.log(res);
         //console.log('info ' + info);
         //setResponse(res);
     }
     catch (e) {
         alert(e.toString());
         return;
     }
     window.location.reload(false);
   };







let num = Object.keys(response.appointments).length
console.log(num)
let p=0;
while(p<num ){
    if(response.appointments[p].timeslot==0){
        response.appointments[p].timeslot='9:00  AM'
    }
    if(response.appointments[p].timeslot==1){
        response.appointments[p].timeslot='10:30 Am' 
    }
    if(response.appointments[p].timeslot==2){
        response.appointments[p].timeslot='12:00 PM'
    }
    if(response.appointments[p].timeslot==3){
        response.appointments[p].timeslot='1:30  PM'
    }
    if(response.appointments[p].timeslot==4){
        response.appointments[p].timeslot='3:00  PM'
    }
    if(response.appointments[p].timeslot==5){
        response.appointments[p].timeslot='4:30  PM'
    }
    if(response.appointments[p].timeslot==6){
        response.appointments[p].timeslot='6:00  Pm'
    }
    if(response.appointments[p].timeslot==7){
        response.appointments[p].timeslot='7:30  PM'
    }
console.log(response.appointments[p].timeslot)

p++;
}
p=0;
while(p<num ){
    if(response.appointments[p].dayofweek==0){
        response.appointments[p].dayofweek='Monday'
    }
    if(response.appointments[p].dayofweek==1){
        response.appointments[p].dayofweek='Tusday'
    }
    if(response.appointments[p].dayofweek==2){
        response.appointments[p].dayofweek='Wednesday'
    }
    if(response.appointments[p].dayofweek==3){
        response.appointments[p].dayofweek='Thursday'
    }
    if(response.appointments[p].dayofweek==4){
        response.appointments[p].dayofweek='Friday'
    }
console.log(response.appointments[p].dayofweek)

p++;
}
p=0;
while(p<num ){
    if(response.appointments[p].month==1){
        response.appointments[p].month='January'
    }
    if(response.appointments[p].month==2){
        response.appointments[p].month='February'
    }
    if(response.appointments[p].month==3){
        response.appointments[p].month='March'
    }
    if(response.appointments[p].month==4){
        response.appointments[p].month='April'
    }
    if(response.appointments[p].month==5){
        response.appointments[p].month='May'
    }
    if(response.appointments[p].month==6){
        response.appointments[p].month='June'
    }
    if(response.appointments[p].month==7){
        response.appointments[p].month='July'
    }
    if(response.appointments[p].month==8){
        response.appointments[p].month='August'
    }
    if(response.appointments[p].month==9){
        response.appointments[p].month='September'
    }
    if(response.appointments[p].month==10){
        response.appointments[p].month='October'
    }
    if(response.appointments[p].month==11){
        response.appointments[p].month='November'
    }
    if(response.appointments[p].month==12){
        response.appointments[p].month='December'
    }
console.log(response.appointments[p].month)

p++;
}

console.log(response2.schedule.Monday[0]==1)


updateobj.schedule=response2.schedule;

function insrt(day,num) {
    if(day=='Monday'){
    if(num==9){
        if(response2.schedule.Monday[0]==1){
            updateobj.schedule.Monday[0]=0;
            console.log(updateobj.schedule)
 return;
        }
        if(response2.schedule.Monday[0]==0){
            updateobj.schedule.Monday[0]=1;
return;
        }
            
    } 
    if(num==10){
            if(response2.schedule.Monday[1]==1){
                updateobj.schedule.Monday[1]=0;
                return;
            }
            if(response2.schedule.Monday[1]==0){
                updateobj.schedule.Monday[1]=1;
            return;
                }




    } 
    if(num==12){
        if(response2.schedule.Monday[2]==1){
            updateobj.schedule.Monday[2]=0;
                return;
            }
            if(response2.schedule.Monday[2]==0){
                updateobj.schedule.Monday[2]=1;
            return;
                }
    }
    if(num==1){
        if(response2.schedule.Monday[3]==1){
            updateobj.schedule.Monday[3]=0;
                return;
            }
            if(response2.schedule.Monday[3]==0){
                updateobj.schedule.Monday[3]=1;
            return;
                }
    } 
    if(num==3){
        if(response2.schedule.Monday[4]==1){
            updateobj.schedule.Monday[4]=0;
                return;
            }
            if(response2.schedule.Monday[4]==0){
                updateobj.schedule.Monday[4]=1;
            return;
                }
    } 
    if(num==4){
        if(response2.schedule.Monday[5]==1){
            updateobj.schedule.Monday[5]=0;
                return;
            }
            if(response2.schedule.Monday[5]==0){
                updateobj.schedule.Monday[5]=1;
            return;
                }
    } 
    if(num==6){
        if(response2.schedule.Monday[6]==1){
            updateobj.schedule.Monday[6]=0;
                return;
            }
            if(response2.schedule.Monday[6]==0){
                updateobj.schedule.Monday[6]=1;
            return;
                }
    } 
    if(num==7){
        if(response2.schedule.Monday[7]==1){
            updateobj.schedule.Monday[7]=0;
                return;
            }
            if(response2.schedule.Monday[7]==0){
                updateobj.schedule.Monday[7]=1;
            return;
                }
    } 
} 
if(day=='Tuesday'){
    if(num==9){
        if(response2.schedule.Tuesday[0]==1){
            updateobj.schedule.Tuesday[0]=0;
                return;
            }
            if(response2.schedule.Tuesday[0]==0){
                updateobj.schedule.Tuesday[0]=1;
            return;
                }
    } 
    if(num==10){
        if(response2.schedule.Tuesday[1]==1){
            updateobj.schedule.Tuesday[1]=0;
                return;
            }
            if(response2.schedule.Tuesday[1]==0){
                updateobj.schedule.Tuesday[1]=1;
            return;
                }
    } 
    if(num==12){
        if(response2.schedule.Tuesday[2]==1){
            updateobj.schedule.Tuesday[2]=0;
                return;
            }
            if(response2.schedule.Tuesday[2]==0){
                updateobj.schedule.Tuesday[2]=1;
            return;
                }
    }
    if(num==1){
        if(response2.schedule.Tuesday[3]==1){
            updateobj.schedule.Tuesday[3]=0;
                return;
            }
            if(response2.schedule.Tuesday[3]==0){
                updateobj.schedule.Tuesday[3]=1;
            return;
                }
    } 
    if(num==3){
        if(response2.schedule.Tuesday[4]==1){
            updateobj.schedule.Tuesday[4]=0;
                return;
            }
            if(response2.schedule.Tuesday[4]==0){
                updateobj.schedule.Tuesday[4]=1;
            return;
                }
    } 
    if(num==4){
        if(response2.schedule.Tuesday[5]==1){
            updateobj.schedule.Tuesday[5]=0;
                return;
            }
            if(response2.schedule.Tuesday[5]==0){
                updateobj.schedule.Tuesday[5]=1;
            return;
                }
    } 
    if(num==6){
        if(response2.schedule.Tuesday[6]==1){
            updateobj.schedule.Tuesday[6]=0;
                return;
            }
            if(response2.schedule.Tuesday[6]==0){
                updateobj.schedule.Tuesday[6]=1;
            return;
                }
    } 
    if(num==7){
        if(response2.schedule.Tuesday[7]==1){
            updateobj.schedule.Tuesday[7]=0;
                return;
            }
            if(response2.schedule.Tuesday[7]==0){
                updateobj.schedule.Tuesday[7]=1;
            return;
                }
    } 
}
if(day=='Wednesday'){
    if(num==9){
        if(response2.schedule.Wednesday[0]==1){
        updateobj.schedule.Wednesday[0]=0;
            return;
        }
        if(response2.schedule.Wednesday[0]==0){
            updateobj.schedule.Wednesday[0]=1;
        return;
            }
    } 
    if(num==10){
        if(response2.schedule.Wednesday[1]==1){
            updateobj.schedule.Wednesday[1]=0;
                return;
            }
            if(response2.schedule.Wednesday[1]==0){
                updateobj.schedule.Wednesday[1]=1;
            return;
                }
    } 
    if(num==12){
        if(response2.schedule.Wednesday[2]==1){
            updateobj.schedule.Wednesday[2]=0;
                return;
            }
            if(response2.schedule.Wednesday[2]==0){
                updateobj.schedule.Wednesday[2]=1;
            return;
                }
    }
    if(num==1){
        if(response2.schedule.Wednesday[3]==1){
            updateobj.schedule.Wednesday[3]=0;
                return;
            }
            if(response2.schedule.Wednesday[3]==0){
                updateobj.schedule.Wednesday[3]=1;
            return;
                }
    } 
    if(num==3){
        if(response2.schedule.Wednesday[4]==1){
            updateobj.schedule.Wednesday[4]=0;
                return;
            }
            if(response2.schedule.Wednesday[4]==0){
                updateobj.schedule.Wednesday[4]=1;
            return;
                }
    } 
    if(num==4){
        if(response2.schedule.Wednesday[5]==1){
            updateobj.schedule.Wednesday[5]=0;
                return;
            }
            if(response2.schedule.Wednesday[5]==0){
                updateobj.schedule.Wednesday[5]=1;
            return;
                }
    } 
    if(num==6){
        if(response2.schedule.Wednesday[6]==1){
            updateobj.schedule.Wednesday[6]=0;
                return;
            }
            if(response2.schedule.Wednesday[6]==0){
                updateobj.schedule.Wednesday[6]=1;
            return;
                }
    } 
    if(num==7){
        if(response2.schedule.Wednesday[7]==1){
            updateobj.schedule.Wednesday[7]=0;
                return;
            }
            if(response2.schedule.Wednesday[7]==0){
                updateobj.schedule.Wednesday[7]=1;
            return;
                }
    } 
}
if(day=='Thursday'){
    if(num==9){
        if(response2.schedule.Thursday[0]==1){
            updateobj.schedule.Thursday[0]=0;
                return;
            }
            if(response2.schedule.Thursday[0]==0){
                updateobj.schedule.Thursday[0]=1;
            return;
                }
    } 
    if(num==10){
        if(response2.schedule.Thursday[1]==1){
            updateobj.schedule.Thursday[1]=0;
                return;
            }
            if(response2.schedule.Thursday[1]==0){
                updateobj.schedule.Thursday[1]=1;
            return;
                }
    } 
    if(num==12){
        if(response2.schedule.Thursday[2]==1){
            updateobj.schedule.Thursday[2]=0;
                return;
            }
            if(response2.schedule.Thursday[2]==0){
                updateobj.schedule.Thursday[2]=1;
            return;
                }
    }
    if(num==1){
        if(response2.schedule.Thursday[3]==1){
            updateobj.schedule.Thursday[3]=0;
                return;
            }
            if(response2.schedule.Thursday[3]==0){
                updateobj.schedule.Thursday[3]=1;
            return;
                }
    } 
    if(num==3){
        if(response2.schedule.Thursday[4]==1){
            updateobj.schedule.Thursday[4]=0;
                return;
            }
            if(response2.schedule.Thursday[4]==0){
                updateobj.schedule.Thursday[4]=1;
            return;
                }
    } 
    if(num==4){
        if(response2.schedule.Thursday[5]==1){
            updateobj.schedule.Thursday[5]=0;
                return;
            }
            if(response2.schedule.Thursday[5]==0){
                updateobj.schedule.Thursday[5]=1;
            return;
                }
    } 
    if(num==6){
        if(response2.schedule.Thursday[6]==1){
            updateobj.schedule.Thursday[6]=0;
                return;
            }
            if(response2.schedule.Thursday[6]==0){
                updateobj.schedule.Thursday[6]=1;
            return;
                }
    } 
    if(num==7){
        if(response2.schedule.Thursday[7]==1){
            updateobj.schedule.Thursday[7]=0;
                return;
            }
            if(response2.schedule.Thursday[7]==0){
                updateobj.schedule.Thursday[7]=1;
            return;
                }
    } 
}
if(day=='Friday'){
    if(num==9){
        if(response2.schedule.Friday[0]==1){
            updateobj.schedule.Friday[0]=0;
                return;
            }
            if(response2.schedule.Friday[0]==0){
                updateobj.schedule.Friday[0]=1;
            return;
                }
    } 
    if(num==10){
        if(response2.schedule.Friday[1]==1){
            updateobj.schedule.Friday[1]=0;
                return;
            }
            if(response2.schedule.Friday[1]==0){
                updateobj.schedule.Friday[1]=1;
            return;
                }
    } 
    if(num==12){
        if(response2.schedule.Friday[2]==1){
            updateobj.schedule.Friday[2]=0;
                return;
            }
            if(response2.schedule.Friday[2]==0){
                updateobj.schedule.Friday[2]=1;
            return;
                }
    }
    if(num==1){
        if(response2.schedule.Friday[3]==1){
            updateobj.schedule.Friday[3]=0;
                return;
            }
            if(response2.schedule.Friday[3]==0){
                updateobj.schedule.Friday[3]=1;
            return;
                }
    } 
    if(num==3){
        if(response2.schedule.Friday[4]==1){
            updateobj.schedule.Friday[4]=0;
                return;
            }
            if(response2.schedule.Friday[4]==0){
                updateobj.schedule.Friday[4]=1;
            return;
                }
    } 
    if(num==4){
        if(response2.schedule.Friday[5]==1){
            updateobj.schedule.Friday[5]=0;
                return;
            }
            if(response2.schedule.Friday[5]==0){
                updateobj.schedule.Friday[5]=1;
            return;
                }
    } 
    if(num==6){
        if(response2.schedule.Friday[6]==1){
            updateobj.schedule.Friday[6]=0;
                return;
            }
            if(response2.schedule.Friday[6]==0){
                updateobj.schedule.Friday[6]=1;
            return;
                }
    } 
    if(num==7){
        if(response2.schedule.Friday[7]==1){
            updateobj.schedule.Friday[7]=0;
                return;
            }
            if(response2.schedule.Friday[7]==0){
                updateobj.schedule.Friday[7]=1;
            return;
                }
    } 
}
}
    







  const [disable, setDisable] = React.useState(false);
  const [disable1, setDisable1] = React.useState(false);
  const [disable2, setDisable2] = React.useState(false);
  const [disable3, setDisable3] = React.useState(false);
  const [disable4, setDisable4] = React.useState(false);
  const [disable5, setDisable5] = React.useState(false);
  const [disable6, setDisable6] = React.useState(false);
  const [disable7, setDisable7] = React.useState(false);
  const [disable8, setDisable8] = React.useState(false);
  const [disable9, setDisable9] = React.useState(false);
  const [disable10, setDisable10] = React.useState(false);
  const [disable11, setDisable11] = React.useState(false);
  const [disable12, setDisable12] = React.useState(false);
  const [disable13, setDisable13] = React.useState(false);
  const [disable14, setDisable14] = React.useState(false);
  const [disable15, setDisable15] = React.useState(false);
    const [disable16, setDisable16] = React.useState(false);
  const [disable17, setDisable17] = React.useState(false);
  const [disable18, setDisable18] = React.useState(false);
  const [disable19, setDisable19] = React.useState(false);
  const [disable20, setDisable20] = React.useState(false);
  const [disable21, setDisable21] = React.useState(false);
  const [disable22, setDisable22] = React.useState(false);
  const [disable23, setDisable23] = React.useState(false);
  const [disable24, setDisable24] = React.useState(false);
  const [disable25, setDisable25] = React.useState(false);
  const [disable26, setDisable26] = React.useState(false);
  const [disable27, setDisable27] = React.useState(false);
  const [disable28, setDisable28] = React.useState(false);
  const [disable29, setDisable29] = React.useState(false);
  const [disable30, setDisable30] = React.useState(false);
  const [disable31, setDisable31] = React.useState(false);
  const [disable32, setDisable32] = React.useState(false);
  const [disable33, setDisable33] = React.useState(false);
  const [disable34, setDisable34] = React.useState(false);
  const [disable35, setDisable35] = React.useState(false);
  const [disable36, setDisable36] = React.useState(false);
  const [disable37, setDisable37] = React.useState(false);
  const [disable38, setDisable38] = React.useState(false);
  const [disable39, setDisable39] = React.useState(false);













  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const doLogout = event => 
    {
        event.preventDefault();

        //localStorage.removeItem("user_data")
        window.location.href = '/';

    }; 
    const email = useRef(null);
    const first = useRef(null);
    const last = useRef(null);
    function handleChange5() {
        /* 3. Get Ref Value here (or anywhere in the code!) */
        //textInput.current.focus();
    
        let professoremail = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@ucf\.edu$');
        const em  = email.current.value;
        
    v1=em;
    console.log(v1.slice(-8)==v1)
    console.log(em);
    console.log(v1);
    console.log(professoremail.test('hi@ucf.edu'));
    console.log(v1);
  
    if(professoremail.test(v1)){
        //privilege = 'professor';
     
        console.log("professor");
    
        return true;
        //v1=em;
    }else{
        console.log('Invalid Email');
        return false;
        //localstoreage.email=v1
    }
        console.log(v1)
//localstoreage.email=v1
 
     }
     function handleChange1() {
        /* 3. Get Ref Value here (or anywhere in the code!) */
        //textInput.current.focus();

       //@ucf.edu
        const fn = first.current.value;
        
    v2=fn;
       

     }
     function handleChange2() {
        /* 3. Get Ref Value here (or anywhere in the code!) */
        //textInput.current.focus();

        const ln = last.current.value;
    v3=ln;
        //console.log(v3)
        //console.log(v1)
     }
     


     
    //  varisActive2=true;
    //  if(response2.schedule.Monday[0]===1){
    //     isActive2=true;
    // }  var [isActive2, setIsActive2] = useState(false);
   
   // isActive2=true;
    //var isActive2=false;
  var dofunc = 1; 
  
//     console.log(response2.schedule)
     useEffect(() => {
        //function monday(){if(response2.schedule.Monday[0]==1) return true; else return false;}
        console.log(response2.schedule)
        // Update the document title using the browser API
        if(dofunc==1){
            
        if(response2.schedule.Monday[0]==1){setIsActive2(true) }
         if(response2.schedule.Monday[1]==1){setIsActive3(true)}
         if(response2.schedule.Monday[2]==1){setIsActive4(true)}
         if(response2.schedule.Monday[3]==1){setIsActive5(true)}
         if(response2.schedule.Monday[4]==1){setIsActive6(true)}
         if(response2.schedule.Monday[5]==1){setIsActive7(true)}
         if(response2.schedule.Monday[6]==1){setIsActive8(true)}
         if(response2.schedule.Monday[7]==1){setIsActive9(true)}
         if(response2.schedule.Tuesday[0]==1){setIsActive10(true)}
         if(response2.schedule.Tuesday[1]==1){setIsActive11(true)}
         if(response2.schedule.Tuesday[2]==1){setIsActive12(true)}
         if(response2.schedule.Tuesday[3]==1){setIsActive13(true)}
         if(response2.schedule.Tuesday[4]==1){setIsActive14(true)}
         if(response2.schedule.Tuesday[5]===1){setIsActive15(true)}
         if(response2.schedule.Tuesday[6]==1){setIsActive16(true)}
         if(response2.schedule.Tuesday[7]==1){setIsActive17(true)}
         if(response2.schedule.Wednesday[0]==1){setIsActive18(true)}
         if(response2.schedule.Wednesday[1]==1){setIsActive19(true)}
         if(response2.schedule.Wednesday[2]==1){setIsActive20(true)}
         if(response2.schedule.Wednesday[3]==1){setIsActive21(true)}
        if(response2.schedule.Wednesday[4]==1){setIsActive22(true)}
        if(response2.schedule.Wednesday[5]==1){setIsActive23(true)}
        if(response2.schedule.Wednesday[6]==1){setIsActive24(true)}
        if(response2.schedule.Wednesday[7]==1){setIsActive25(true)}
        if(response2.schedule.Thursday[0]==1){setIsActive26(true)}
        if(response2.schedule.Thursday[1]==1){setIsActive27(true)}
        if(response2.schedule.Thursday[2]==1){setIsActive28(true)}
        if(response2.schedule.Thursday[3]==1){setIsActive29(true)}
        if(response2.schedule.Thursday[4]==1){setIsActive30(true)}
        if(response2.schedule.Thursday[5]==1){setIsActive31(true)}
        if(response2.schedule.Thursday[6]==1){setIsActive32(true)}
        if(response2.schedule.Thursday[7]==1){setIsActive33(true)}
        if(response2.schedule.Friday[0]==1){setIsActive34(true)}
        if(response2.schedule.Friday[1]==1){setIsActive35(true)}
        if(response2.schedule.Friday[2]==1){setIsActive36(true)}
        if(response2.schedule.Friday[3]==1){setIsActive37(true)}
        if(response2.schedule.Friday[4]==1){setIsActive38(true)}
        if(response2.schedule.Friday[5]==1){setIsActive39(true)}
        if(response2.schedule.Friday[6]==1){setIsActive40(true)}
        if(response2.schedule.Friday[7]==1){setIsActive41(true)}
        console.log(dofunc);
      dofunc=2;
      
      console.log(dofunc);
        }
    }, [response2]);
     var [isActive2, setIsActive2] = useState(false);
     var [isActive3, setIsActive3] = useState(false);
     var [isActive4, setIsActive4] = useState(false);
     var [isActive5, setIsActive5] = useState(false);
     var [isActive6, setIsActive6] = useState(false);
     var [isActive7, setIsActive7] = useState(false);
     var [isActive8, setIsActive8] = useState(false);
     var [isActive9, setIsActive9] = useState(false);
     const [isActive10, setIsActive10] = useState(false);
     const [isActive11, setIsActive11] = useState(false);
     const [isActive12, setIsActive12] = useState(false);
     const [isActive13, setIsActive13] = useState(false);
     const [isActive14, setIsActive14] = useState(false);
     const [isActive15, setIsActive15] = useState(false);
     const [isActive16, setIsActive16] = useState(false);
     const [isActive17, setIsActive17] = useState(false);
     const [isActive18, setIsActive18] = useState(false);
     const [isActive19, setIsActive19] = useState(false);
     const [isActive20, setIsActive20] = useState(false);
     const [isActive21, setIsActive21] = useState(false);
     const [isActive22, setIsActive22] = useState(false);
     const [isActive23, setIsActive23] = useState(false);
     const [isActive24, setIsActive24] = useState(false);
     const [isActive25, setIsActive25] = useState(false);
     const [isActive26, setIsActive26] = useState(false);
     const [isActive27, setIsActive27] = useState(false);
     const [isActive28, setIsActive28] = useState(false);
     const [isActive29, setIsActive29] = useState(false);
     const [isActive30, setIsActive30] = useState(false);
     const [isActive31, setIsActive31] = useState(false);
     const [isActive32, setIsActive32] = useState(false);
     const [isActive33, setIsActive33] = useState(false);
     const [isActive34, setIsActive34] = useState(false);
     const [isActive35, setIsActive35] = useState(false);
     const [isActive36, setIsActive36] = useState(false);
     const [isActive37, setIsActive37] = useState(false);
     const [isActive38, setIsActive38] = useState(false);
     const [isActive39, setIsActive39] = useState(false);
     const [isActive40, setIsActive40] = useState(false);
     const [isActive41, setIsActive41] = useState(false);
    









     
     
     //useEffect();
     const HandleClick2 = () => {setIsActive2(current => !current);}
     const HandleClick3 = () => {setIsActive3(current => !current);}
     const HandleClick4 = () => {setIsActive4(current => !current);}
     const HandleClick5 = () => {setIsActive5(current => !current);}
     const HandleClick6 = () => {setIsActive6(current => !current);}
     const HandleClick7 = () => {setIsActive7(current => !current);}
     const HandleClick8 = () => {setIsActive8(current => !current);}
     const HandleClick9 = () => {setIsActive9(current => !current);}
     const HandleClick10 = () => {setIsActive10(current => !current);}
     const HandleClick11 = () => {setIsActive11(current => !current);}
     const HandleClick12 = () => {setIsActive12(current => !current);}
     const HandleClick13 = () => {setIsActive13(current => !current);}
     const HandleClick14 = () => {setIsActive14(current => !current);}
     const HandleClick15 = () => {setIsActive15(current => !current);}
     const HandleClick16 = () => {setIsActive16(current => !current);}
     const HandleClick17 = () => {setIsActive17(current => !current);}
     const HandleClick18 = () => {setIsActive18(current => !current);}
     const HandleClick19 = () => {setIsActive19(current => !current);}
     const HandleClick20 = () => {setIsActive20(current => !current);}
     const HandleClick21 = () => {setIsActive21(current => !current);}
     const HandleClick22 = () => {setIsActive22(current => !current);}
     const HandleClick23 = () => {setIsActive23(current => !current);}
     const HandleClick24 = () => {setIsActive24(current => !current);}
     const HandleClick25 = () => {setIsActive25(current => !current);}
     const HandleClick26 = () => {setIsActive26(current => !current);}
     const HandleClick27 = () => {setIsActive27(current => !current);}
     const HandleClick28 = () => {setIsActive28(current => !current);}
     const HandleClick29 = () => {setIsActive29(current => !current);}
     const HandleClick30 = () => {setIsActive30(current => !current);}
     const HandleClick31 = () => {setIsActive31(current => !current);}
     const HandleClick32 = () => {setIsActive32(current => !current);}
     const HandleClick33 = () => {setIsActive33(current => !current);}
     const HandleClick34 = () => {setIsActive34(current => !current);}
     const HandleClick35 = () => {setIsActive35(current => !current);}
     const HandleClick36 = () => {setIsActive36(current => !current);}
     const HandleClick37 = () => {setIsActive37(current => !current);}
     const HandleClick38 = () => {setIsActive38(current => !current);}
     const HandleClick39 = () => {setIsActive39(current => !current);}
     const HandleClick40 = () => {setIsActive40(current => !current);}
     const HandleClick41 = () => {setIsActive41(current => !current);}
     //const HandleClick42 = () => {setIsActive42(current => !current);}
     
   

  return (
      <>
      <div className="Megadiv"
       
        >

      <Navbar bg="dark" variant="dark"
     style={{position: "sticky"}}fixed="top"
    >
        <Container>
          <Navbar.Brand href="#home">Welcome, Professor {localStorage.lastname}</Navbar.Brand>
          <Nav className="ms-auto">

            <Nav.Link  onClick={doLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
<div className="omegadiv" style={{ 
    //flex: 1,backgroundColor: '#6ED4C8'
      //backgroundImage: `url("https://thumbs.dreamstime.com/z/dark-wood-table-top-bar-blur-#d6ebbd-palm-leaves-tree-tropical-forest-bokeh-light-background-using-mock-up-150707969.jpg")` 
    }}>


<div className="accordio" style={{ 
      //backgroundImage: `url("https://thumbs.dreamstime.com/z/dark-wood-table-top-bar-blur-#d6ebbd-palm-leaves-tree-tropical-forest-bokeh-light-background-using-mock-up-150707969.jpg")` 
    }}>
      <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header style={{fontWeight: 'bold',border:"unset !important", backgroundColor: "rgb(194, 221, 162) !important"}}>
            <span style={{fontFamily: 'Copperplate,Copperplate, Fantasy', fontWeight: 'bold',border:"unset !important",backgroundColor: "rgb(194, 221, 162) !important"}}>See Your Availability.</span>
            
            </Accordion.Header >
        <Accordion.Body  >
            <ButtonGroup 
            style={{ margin:"-1%",marginRight: "100", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mb-3" 
            >
                <Button class="btn btn-outline-light" 
                style={{     
                    fontSize: 13,  
                    backgroundColor: isActive2  ? '#6c834f' : '#d6ebbd',
                    color: 'black',
                  }}
                
                  onClick={() =>{insrt("Monday",9);HandleClick2()}}
                >Monday 9:00  Am</ Button >
                <Button class="btn btn-outline-light" 
               
                style={{
                    fontSize: 13,
                
                    backgroundColor: isActive3  ? '#6c834f' : '#d6ebbd',
                    color: 'black',
                  }}
                  onClick={() =>{insrt("Monday",10);HandleClick3()}}
                >Monday 10:30 Am</Button>
                <Button class="btn btn-outline-light" 
                 style={{
                    fontSize: 13,
                    backgroundColor: isActive4? '#6c834f' : '#d6ebbd',
              
                    color: 'black' ,
                  }}
                  onClick={() =>{insrt("Monday",12);HandleClick4()}} >
                Monday 12:00 PM</Button>
                <Button class="btn btn-outline-light"  style={{
                    fontSize: 13,
                    backgroundColor: isActive5? '#6c834f' : '#d6ebbd',
                    color: 'black'
                  }}
                  onClick={() =>{insrt("Monday",1);HandleClick5()}} 
                >Monday 1:30  PM</Button>
                <Button class="btn btn-outline-light"  style={{
                    fontSize: 13,
                    backgroundColor: isActive6? '#6c834f' : '#d6ebbd',
                    color: 'black'
                  }}
                  onClick={() =>{insrt("Monday",3);HandleClick6()}}  
                
                >Monday 3:00  PM</Button>
                <Button class="btn btn-outline-light" 
                 style={{
                    fontSize: 13,
                    backgroundColor: isActive7? '#6c834f' : '#d6ebbd',
                    color:  'black'
                  }}
                  onClick={() =>{insrt("Monday",4);HandleClick7()}} >
                    Monday 4:30  PM</Button>
                <Button class="btn btn-outline-light" 
                 style={{
                    fontSize: 13,
                    backgroundColor: isActive8? '#6c834f' : '#d6ebbd',
                    color:  'black'
                  }}
                  onClick={() =>{insrt("Monday",6);HandleClick8()}}
                >Monday 6:00  PM</Button>
                <Button class="btn btn-outline-light" 
            
                style={{
                    fontSize: 13,
                    backgroundColor: isActive9? '#6c834f' : '#d6ebbd',
                    color:'black'
                  }}
                  onClick={() =>{insrt("Monday",7);HandleClick9()}}
                >Monday 7:30  PM</Button>
            </ButtonGroup>
         <br />
            <ButtonGroup 
            style={{color:"95bb65",margin:"-1%", marginRight: "100", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mb-3" 
            >
                <Button class="btn btn-outline-light" 
                  style={{
                    fontSize: 13,
                    backgroundColor: isActive10? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Tuesday",9);HandleClick10()}}
                  
                >Tuesday 9:00  Am</ Button >
                <Button class="btn btn-outline-light"   
                style={{
                    fontSize: 13,
                    backgroundColor: isActive11? '#6c834f' : '#d6ebbd',
                    color: 'black'
                  }}
                  onClick={() =>{insrt("Tuesday",10);HandleClick11()}}
                
                  >Tuesday 10:30 Am</Button>
                <Button class="btn btn-outline-light" 
                  style={{
                    fontSize: 13,
                    backgroundColor: isActive12? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Tuesday",12);HandleClick12()}}
                
                >Tuesday 12:00 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive13? '#6c834f' : '#d6ebbd',
                    color:'black' 
                  }}
                  onClick={() =>{insrt("Tuesday",1);HandleClick13()}}
                  
                  >Tuesday 1:30  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive14? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Tuesday",3);HandleClick14()}}
                 
                    >Tuesday 
                    3:00  PM</Button>
                <Button class="btn btn-outline-light"
                style={{
                    fontSize: 13,
                    backgroundColor: isActive15? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Tuesday",4);HandleClick15()}}
                   
                >Tuesday 4:30  PM</Button>
                <Button class="btn btn-outline-light"
                style={{
                    fontSize: 13,
                    backgroundColor: isActive16? '#6c834f' : '#d6ebbd',
                    color: 'black'
                  }}
                  onClick={() =>{insrt("Tuesday",6);HandleClick16()}}
                 
                >Tuesday 6:00  PM</Button>
                <Button class="btn btn-outline-light" 
                
                style={{
                    fontSize: 13,
                    backgroundColor: isActive17? '#6c834f' : '#d6ebbd',
                    color: 'black'
                  }}
                  onClick={() =>{insrt("Tuesday",7);HandleClick17()}}
                 
                >Tuesday 7:30  PM</Button>
            </ButtonGroup>
            <br />
            <ButtonGroup 
            style={{margin:"-1%", marginRight: "4000", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mb-3" 
            
            >
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive18? '#6c834f' : '#d6ebbd',
                    color:'black' 
                  }}
                  onClick={() =>{insrt("Wednesday",9);HandleClick18()}}
                
                >Wednesday 9:00 Am</ Button >
                <Button class="btn btn-outline-light"  
                style={{
                    fontSize: 13,
                    backgroundColor: isActive19? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Wednesday",10);HandleClick19()}}
                 
                >Wednesday 10:30 Am</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive20? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Wednesday",12);HandleClick20()}}
                   
                >Wednesday 12:00 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive21? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Wednesday",1);HandleClick21()}}
                 
                >Wednesday 1:30 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive22? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Wednesday",3);HandleClick22()}}
                 
                >Wednesday 3:00 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive23? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Wednesday",4);HandleClick23()}}
                   
                >Wednesday 4:30 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive24? '#6c834f' : '#d6ebbd',
                    color:  'black'
                  }}
                  onClick={() =>{insrt("Wednesday",6);HandleClick24()}}
                
                >Wednesday 6:00 PM</Button>
                <Button class="btn btn-outline-light" 
               style={{
                fontSize: 13,
                backgroundColor: isActive25? '#6c834f' : '#d6ebbd',
                color: 'black' 
              }}
              onClick={() =>{insrt("Wednesday",7);HandleClick25()}}
            
                >Wednesday 7:30 PM</Button>
            </ButtonGroup>
            <br />
            <ButtonGroup  
            style={{color:"95bb65", margin:"-1%",marginRight: "100", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mb-3" 
            >
            <Button class="btn btn-outline-light" 
            style={{
                fontSize: 13,
                backgroundColor: isActive26? '#6c834f' : '#d6ebbd',
                color: 'black' 
              }}
              onClick={() =>{insrt("Thursday",9);HandleClick26()}}
            
            >Thursday   9:00  Am</ Button >
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive27? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Thursday",10);HandleClick27()}}
                  
                >Thursday 10:30 Am</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive28? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Thursday",12);HandleClick28()}}
                  
                >Thursday 12:00 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive29? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Thursday",1);HandleClick29()}}
                  
                >Thursday   1:30  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive30? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Thursday",3);HandleClick30()}}
    
                >Thursday   3:00  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive31? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Thursday",4);HandleClick31()}}
                  
                >Thursday   4:30  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive32? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Thursday",6);HandleClick32()}}
                
                >Thursday   6:00  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive33? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Thursday",7);HandleClick33()}}
                   
                >Thursday   7:30  PM</Button>
            </ButtonGroup>
            <br />
            
            <ButtonGroup 
            style={{color:"95bb65", margin:"-1%",marginRight: "100", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
            className="mb-3" 
            >
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive34? '#6c834f' : '#d6ebbd',
                    color:'black'
                  }}
                  onClick={() =>{insrt("Friday",9);HandleClick34()}}
                  
                >Friday 9:00  Am</ Button >
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive35? '#6c834f' : '#d6ebbd',
                    color:  'black'
                  }}
                  onClick={() =>{insrt("Friday",10);HandleClick35()}}
                   
                >Friday 10:30 Am</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive36? '#6c834f' : '#d6ebbd',
                    color:'black' 
                  }}
                  onClick={() =>{insrt("Friday",12);HandleClick36()}}
                
                >Friday 12:00 PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive37? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Friday",1);HandleClick37()}}
                  
                >Friday 1:30  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive38? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Friday",3);HandleClick38()}}
                  
                >Friday 3:00  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive39? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Friday",4);HandleClick39()}}
                   
                >Friday 4:30  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive40? '#6c834f' : '#d6ebbd',
                    color: 'black' 
                  }}
                  onClick={() =>{insrt("Friday",6);HandleClick40()}}
                   
                >Friday 6:00  PM</Button>
                <Button class="btn btn-outline-light" 
                style={{
                    fontSize: 13,
                    backgroundColor: isActive41? '#6c834f' : '#d6ebbd',
                    color:  'black' 
                  }}
                  onClick={() =>{insrt("Friday",7);HandleClick41()}}
                
                >Friday 7:30  PM</Button>
            </ButtonGroup>.
     
            <br />
                <Button class="btn btn-outline-light" style={{fontSize: 13, backgroundColor:"#95bb65"}} variant="primary" onClick={handleShow}>
        Press to Set Schedule 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wan to update your schdule?</Modal.Body>
        <Modal.Footer>
        <Button variant="primary" 
        onClick={() =>{handleClose();setapi1()}}
        >
            Yes, Save changes
          </Button>
        
          <Button variant="secondary" 
          onClick={handleClose}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>

     
            
        </Accordion.Body>
        </Accordion.Item>
     </Accordion>








    </div>  
      





    <div className="App" style={{ 
    //   backgroundSize: '1px;', backgroundImage: `url("https://thumbs.dreamstime.com/z/dark-wood-table-top-bar-blur-#d6ebbd-palm-leaves-tree-tropical-forest-bokeh-light-background-using-mock-up-150707969.jpg")` 
    }}>
        <h1 style={{fontFamily: 'Copperplate,Copperplate, Fantasy'}}>Events</h1>
            <table class="fixed_header" align="center">
                <thead>
                    <tr>
                        <th>Title/Student name</th>
                        <th>Month</th>
                        <th>Day</th>
                        <th>Day of week</th>
                        <th>Time</th>
                    </tr>
                </thead>
            <tbody >
            {
            response.appointments.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.title}</td>
                  <td>{value.month}</td>
                  <td>{value.day}</td>
                  <td>{value.dayofweek}</td>
                  <td>{value.timeslot}</td>
                </tr>
                )
            })
            }
            </tbody>
        </table>
    </div>

    <div className="accordio2">
    <Accordion>
     <Accordion.Item eventKey="0">
         <Accordion.Header>
         <span style={{fontFamily: 'Copperplate,Copperplate, Fantasy',fontWeight: 'bold',border:"unset !important",backgroundColor: "rgb(194, 221, 162) !important"}}>Profile.</span>
         </Accordion.Header >
     <Accordion.Body  >
     <br /> Hello Professor 
     <br />
            {localStorage.firstname}
            <br />
            <br />
            {localStorage.lastname}
            <br />
            <br />
            {localStorage.email}
            <br />
            <br />
            CPE/CS Department  
            
     </Accordion.Body>
     </Accordion.Item>
  </Accordion>
   <Accordion>
     <Accordion.Item eventKey="0">
         <Accordion.Header>
         <span style={{fontFamily: 'Copperplate,Copperplate, Fantasy',fontWeight: 'bold',border:"unset !important",backgroundColor: "rgb(194, 221, 162) !important"}}>Update Profile.</span>
         </Accordion.Header >
     <Accordion.Body  >
         

     <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label 
       
        >Update Email address</Form.Label>
        <Form.Control  
         ref={email} type="text" onChange={() =>{handleChange5()}}
        
        />
        <Form.Text >
        <Button disabled={false}  class="btn btn-outline-light" style={{fontSize: 13, backgroundColor:"#95bb65"}} variant="primary" 
    >
    wrong email
   </Button>


        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Update First Name</Form.Label>
        <Form.Control
        ref={first} type="text" onChange={() =>handleChange1()}
        
        
        />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Update Last Name</Form.Label>
        <Form.Control
        ref={last} type="text" onChange={() =>{handleChange2();handleChange2();}}
        />
      </Form.Group>
    
      
     <Button 
     
    //  class="btn btn-outline-light" style={{fontSize: 13, backgroundColor:"#95bb65"}} variant="primary" 
    // onClick={() =>{updateinformation();handleClose();}} 
    // style={{ backgroundColor: state === "active" ? "#F00" : "#00F" }}
    // onClick={() =>{setState("not")}}
    //setState
    >
    Submit Changes
   </Button>
 
  
    

    
   </Form>
     </Accordion.Body>
     </Accordion.Item>
  </Accordion>
 </div>   




    </div>




    </div>
    </>
    
  );
        }

export default Cal;


 




var i=0;
// var j=0;
// var dayofweek;
// var time;
// var list = []

// console.log(response.schedule);
// while(i<2){
// if(response.schedule[i][j]==1){
//         if(i==0){
//             dayofweek='monday';
//         }
//         if(i==1){
//             dayofweek='tusday';
//         }
//         if(i==2){
//             dayofweek='Wednesday';
//         }
//         if(i==3){
//             dayofweek='thursday';
//         }
//         if(i==4){
//             dayofweek='friday';
//         }
//         if(j==0){
//             time = '9 am';
//         }
//         if(j==1){
//             time ='10 am';
//         }
//         if(j==2){
//             time='11 am';
//         }
//         if(j==3){
//             time='12 am';
//         }
//         if(j==4){
//             time='1 pm';
//         }
//         if(j==5){
//             time='2 pm';
//         }
//         if(j==6){
//             time='3 pm';
//         }
//         if(j==7){
//             time='4 pm';
//         }
//     }

//     console.log(dayofweek+time);
//     list.push(dayofweek+time);
//     j++
   
//     if(j==5){
//         j=0;
//         i++;
//     }
// }
