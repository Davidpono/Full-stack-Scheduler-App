import React, { useState } from 'react';
import ConfirmResetpassword from '../components/ConfirmResetpassword'
import {Button,Form,Container,Col, Row} from 'react-bootstrap';
import PageTitle from '../components/PageTitle';


function ConfirmPasswordPage() {
  return (
    <div>
      <PageTitle/>
      <ConfirmResetpassword/>
    </div>
  )
}

export default ConfirmPasswordPage
