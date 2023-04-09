import React, { useEffect, useState, Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Table } from 'react-bootstrap'
import axios from 'axios';
import UserAddModal from '../components/UserAddModal';
import UserEditModal from '../components/UserEditModal';
import Navigation from '../components/Navigation';


const BASE = `https://example-brocode.onrender.com/users`;

const Users = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [users, setUsers] = useState([])
    //const [ editModalShow, setEditModalShow ] = useState(false)
    //const [toBeEdited, setToBeEdited] = useState({})
    const [editConfig, setEditConfig] = useState({
      isVisible: false,
      name: "",
      age: "",
      email: "",
      contactNumber: "",
      location: "",
      _id: ""
    })

     useEffect(() => {
      axios.get(BASE).then((response) => {      
        setUsers(response.data);
      });
     },[showAddModal, editConfig])



     const handleDelete = (id) => {
      axios
        .delete(`${BASE}/${id}`).then((response) => {        
          
          axios.get(BASE).then((response) => {      
            setUsers(response.data);
          });
        })
    }

    const handleEdit = (user) => {
      console.log(user, "Edit clicked")
      const temp = {...user, isVisible: true}
    //setToBeEdited(temp)
    //setEditModalShow(true)
      setEditConfig(temp)
    }

    const handleEditModalClose = () => {
      let new1 = {...editConfig, isVisible: false}
      setEditConfig(new1)
    }


  return (
    <Fragment>
    <Navigation />
    <div className='mt-4'>
        <Container>
            <Row>
                <Col md={8}></Col>
                <Col md={4}> <Button variant='primary' onClick={() => setShowAddModal(true)}>Add User</Button></Col>
            </Row>
            <Row className='mt-3'>
                <Col md={2}></Col>
                <Col md={8}> 
                <Table striped bordered hover>
                <thead>
                  <tr className='table-dark'>                    
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>                
                  
                  {users.map((user) => {
                    return (
                      <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.email}</td>
                      <td>{user.contactNumber}</td>
                      <td>{user.location.city}</td>
                      <td className="d-flex justify-content-center">
                          <Button variant='warning'
                           className='me-2'
                           onClick={() => handleEdit(user)}>Edit</Button>
                          <Button variant='danger' onClick={() => handleDelete(user._id)}>Delete</Button>
                       </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
                </Col>
            </Row>
        </Container>
        <UserAddModal show={showAddModal} onHide={() => setShowAddModal(!showAddModal)}/>
        <UserEditModal show={editConfig.isVisible} 
        onHide={() => handleEditModalClose()} data={editConfig} />
    </div>
    </Fragment>
  )
}

export default Users