import React, {useState,useEffect} from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

function DeleteReservation() {

    let bp = require('./Path.js');
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    
    
    const deleteReservation = async event => {
    
    
        let obj={userid: ud._id}
        let js = JSON.stringify(obj);

        try{
            const response = await fetch(bp.buildPath('api/deletereservation'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' }});

            let res = JSON.parse(await response.text());

            console.log('res');
            console.log(res);

        }catch (e) {
            alert(e.toString());
            return;
        }


    }
  return (

    <>
      <Button onClick={()=>{deleteReservation();}} style={{backgroundColor:'red', width:'100%'}}>Cancel</Button>
    </>

  )
}

export default DeleteReservation
