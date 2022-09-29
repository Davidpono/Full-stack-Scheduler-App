import React, {useState} from 'react'
import {Form,Button,Container,Row,Col, Modal} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Styled = styled.div`
    background-color: #84A98C;

    a{
        color:white;
    }
`

// use a prop to trigger the pop up form
function Register() {

    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        
        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17,  606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12,  1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7,  1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7,  1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22,  1236535329);
        
        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14,  643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9,  38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5,  568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20,  1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14,  1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);
        
        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16,  1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11,  1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4,  681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23,  76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16,  530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);
        
        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10,  1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6,  1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6,  1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21,  1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15,  718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);
        
        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
        
        }
        
        function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
        }
        
        function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        
        function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        
        function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
        }
        
        function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        
        function md51(s) {
        var txt = '';
        var n = s.length,
        state = [1732584193, -271733879, -1732584194, 271733878], i;
        for (i=64; i<=s.length; i+=64) {
        md5cycle(state, md5blk(s.substring(i-64, i)));
        }
        s = s.substring(i-64);
        var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
        for (i=0; i<s.length; i++)
        tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
        tail[i>>2] |= 0x80 << ((i%4) << 3);
        if (i > 55) {
        md5cycle(state, tail);
        for (i=0; i<16; i++) tail[i] = 0;
        }
        tail[14] = n*8;
        md5cycle(state, tail);
        return state;
        }
        
        /* there needs to be support for Unicode here,
         * unless we pretend that we can redefine the MD-5
         * algorithm for multi-byte characters (perhaps
         * by adding every four 16-bit characters and
         * shortening the sum to 32 bits). Otherwise
         * I suggest performing MD-5 as if every character
         * was two bytes--e.g., 0040 0025 = @%--but then
         * how will an ordinary MD-5 sum be matched?
         * There is no way to standardize text to something
         * like UTF-8 before transformation; speed cost is
         * utterly prohibitive. The JavaScript standard
         * itself needs to look at this: it should start
         * providing access to strings as preformed UTF-8
         * 8-bit unsigned value arrays.
         */
        function md5blk(s) { /* I figured global was faster.   */
        var md5blks = [], i; /* Andy King said do it this way. */
        for (i=0; i<64; i+=4) {
        md5blks[i>>2] = s.charCodeAt(i)
        + (s.charCodeAt(i+1) << 8)
        + (s.charCodeAt(i+2) << 16)
        + (s.charCodeAt(i+3) << 24);
        }
        return md5blks;
        }
        
        var hex_chr = '0123456789abcdef'.split('');
        
        function rhex(n)
        {
        var s='', j=0;
        for(; j<4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
        + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
        }
        
        function hex(x) {
        for (var i=0; i<x.length; i++)
        x[i] = rhex(x[i]);
        return x.join('');
        }
        
        function md5(s) {
        return hex(md51(s));
        }
        
        /* this function is much faster,
        so if possible we use it. Some IEs
        are the only ones I know of that
        need the idiotic second function,
        generated by an if clause.  */
        
        function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
        }
        
        if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        function add32(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
        }
        }

  let bp = require('./Path.js');
  
  const [message,setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [validated,setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const [privilege, setPrivilege] = useState('');

  var email;
  var login;
  var password;
  var password2;
  var firstname;
  var lastname;
  var privilege;

  // email validation
  let studentemail = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@k(nights)?nights\.ucf\.edu$');
  let professoremail = new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@ucf\.edu$');
  
  function validEmail(email){
    if(studentemail.test(email)){
        privilege = 'student';
        console.log("student");
    }else if(professoremail.test(email)){
        privilege = 'professor';
        console.log("professor");
    }else{
        console.log('Invalid Email');
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const doRegister = async event => {
    event.preventDefault();


    //call function
    validEmail(email.value);

   const new_password = md5(password.value);
    

    let obj = { firstname: firstname.value, lastname: lastname.value, email: email.value, login: login.value, password: new_password, privilege: privilege};

    
    let js = JSON.stringify(obj);

    console.log('obj ' + obj.firstname + ' ' + obj.privilege);
    console.log('js '+js);


    if(email.value === '' || firstname.value === '' || lastname.value === '' || email.value === '' || login.value === '' || password.value === '' || password2.value === ''){
        setMessage('Please Fill Out All Fields');
        return;
    }
      
    if(email.value === '' && firstname.value === '' && lastname.value === '' && email.value === '' && login.value === '' && password.value === '' && password2.value === ''){
        setMessage('Please Fill Out All Fields');
        return;
    }

    if (password.value !== password2.value){
        setMessage('Passwords are not the same!');
        return;
    }
      

    try {

        const response = await fetch(bp.buildPath('api/register'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

        let res = JSON.parse(await response.text());
        
        console.log('res');
        console.log(res);

    if (res._id >= 0) {
        setMessage('User/Password combination incorrect');
    }
    if(res.message === 'User Already Registered'){
        setMessage('User Already Registered');
    }
    else {
        setMessage('Account Created!');
        //window.location.href = '/';
    }

    }
    catch (e) {
        alert(e.toString());
        return;
    }
      
};


  return( // pass a boolean value
  <>
    <Styled>
        <p style={{textAlign: 'center'}}><a href="#" onClick={handleShow}>Register</a></p>
        <Container className="p-4 register-container align-content-center align-items-center justify-content-center">
        <Modal className='p-5' show={show} onHide={handleClose}>

            <Modal.Header style={{backgroundColor: '#354F52', borderBottom: '2px solid black'}} closeButton>

            <Modal.Title style={{color: 'white'}}>Reigster Account</Modal.Title>

            </Modal.Header>

            <Modal.Body  style={{backgroundColor: '#CAD2C5'}}>
                <Container className = 'mbc p-4' style={{margin:'2px' ,backgroundColor:'#84A98C'}}>

                    <Form validated={validated} onSubmit={handleSubmit}>
                        <Row className = "justify-content-center">
                            <Col lg={8}>
                                <Form.Group >
                                <Form.Label id = "email"></Form.Label>
                                    <Form.Control type="email" placeholder="email" ref={(c) => email = c}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className = "justify-content-center">
                            <Col lg={8}>
                                <Form.Group >
                                <Form.Label id = "username"></Form.Label>
                                    <Form.Control type="text" placeholder="First Name" ref={(c) => firstname = c}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className = "justify-content-center">
                            <Col lg={8}>
                                <Form.Group >
                                <Form.Label id = "username"></Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" ref={(c) => lastname = c}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className = "justify-content-center">
                            <Col lg={8}>
                                <Form.Group >
                                <Form.Label id = "username"></Form.Label>
                                    <Form.Control type="text" placeholder="Username" ref={(c) => login = c}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className = "justify-content-center">
                            <Col lg={8}>
                                <Form.Group >
                                    <Form.Label ></Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={(c) => password = c}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className = "justify-content-center">
                            <Col lg={8}>
                                <Form.Group>
                                    <Form.Label ></Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" ref={(c) => password2 = c}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className = 'justify-content-center'>
                            <Col lg={8}>
                                <Form.Label></Form.Label>
                                <Button style={{
                                    width:'100%', margin:'2px', backgroundColor: '#2F3E46'
                                    }} 
                                    type='submit' onClick={doRegister} onSubmit = {validEmail}>Register</Button>
                            </Col>
                        </Row>

                        <Row className = 'justify-content-center'>
                            <Col style={{paddingTop:'2px'}} lg={6}>
                                <span style={{color:'darkred'}}>{message}</span>
                            </Col>    
                        </Row>

                    </Form>
                </Container>
            </Modal.Body>

            <Modal.Footer style={{backgroundColor: '#354F52', borderTop: '2px solid black'}}>
                <Row>
                    <Button style ={{backgroundColor:'#52796F'}} onClick={handleClose}>
                        Close
                    </Button>
                </Row>

            </Modal.Footer>
    </Modal>
    
    </Container>
  </Styled>
  </>
  )
}

export default Register
