import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const BASELOCATION = `https://example-brocode.onrender.com/locations`;

const UserEditModal = (props) => {

    const { data } = props

    const [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        email: "",
        contactNumber: "",
        location: "",
        id: ""
      });
      const [locations, setLocation] = useState([])

      useEffect(() => {
        axios.get(BASELOCATION).then((response) => {      
          setLocation(response.data);
        });
      },[data])

      useEffect(() => {
        console.log(data.location, "This is  location")
        let obj = {
            name: data.name || "",
            age: data.age || "",
            email: data.email || "",
            contactNumber: data.contactNumber || "",
            location: data.location._id || "" ,
            id: data._id
        } 
               
        setInputValue(obj)

    }, [data])
    

      const handleData = (e) => {    
        const { name, value } = e.target;
        setInputValue((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

      const handleEdit = (e) => {
        e.preventDefault();
  
      let modUser = { ...inputValue };
      console.log(modUser);      
        axios.put("https://example-brocode.onrender.com/users/" + modUser.id, modUser )
        .then((response) => {
            setInputValue({ name: "",
            age: "",
            email: "",
            contactNumber: "",
            location: "",
            id: ""
         })
            alert("User Edit Completed !!!")
            props.onHide()
        })
      }

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add/Edit User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleEdit(e)}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={inputValue.name}
              onChange={(e) => handleData(e)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter age"
              name="age"
              value={inputValue.age}
              onChange={(e) => handleData(e)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={inputValue.email}
              onChange={(e) => handleData(e)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact"
              name="contactNumber"
              value={inputValue.contactNumber}
              onChange={(e) => handleData(e)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Location</Form.Label>
            <Form.Select name="location" value={inputValue.location} onChange={(e) => handleData(e)}>
              <option value={""}>Select city</option>
              {locations.map((location) => 
                <option key={location._id} value={location._id}>{location.city}</option>)}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserEditModal