import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <Container fluid 
      style={{height: "100vh" , width: "100vw" , backgroundColor: "pink"}}
      className='d-flex align-items-center justify-content-center' >
        <Button variant="dark" size="lg"><NavLink to={"/users"}>Enter as Admin</NavLink></Button>
      </Container>
    </div>
  )
}

export default Register