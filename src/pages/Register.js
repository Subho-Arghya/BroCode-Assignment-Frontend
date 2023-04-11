import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'


const Register = () => {
  let navContext = useContext(AppContext)
  const { setIsAdmin } = navContext
  const navigate = useNavigate()

  const handleUserEntry = () => {
    setIsAdmin(false)
    navigate("/users")
  }

  const handleAdminEntry = () => {
    setIsAdmin(true)
    navigate("/users")
  }
  return (
    <div>
      <Container fluid 
      style={{height: "100vh" , width: "100vw" , backgroundColor: "pink"}}
      className='d-flex align-items-center justify-content-center' >
        <Button variant="dark" size="lg" className='me-4' onClick={handleAdminEntry}>Enter as Admin</Button>
        <Button variant='dark' size='lg' onClick={handleUserEntry}>Enter as User</Button>        
      </Container>
    </div>
  )
}

export default Register