import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const BASELOCATION = `https://example-brocode.onrender.com/locations`;

const UserModal = (props) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    age: "",
    email: "",
    contactNumber: "",
    location: ""
  });
  const [locations, setLocation] = useState([])

  useEffect(() => {
    axios.get(BASELOCATION).then((response) => {      
      setLocation(response.data);
    });
  },[])

  const handleData = (e) => {    
    const { name, value } = e.target;
    setInputValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    let newUser = { ...inputValue };
    console.log(newUser);
    axios
      .post(`https://example-brocode.onrender.com/users`, newUser)
      .then((response) => {
        console.log(response);
        setInputValue({name: "",
        age: "",
        email: "",
        contactNumber: "",
        location: ""});
      });
  };
  

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add/Edit User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleAdd(e)}>
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
  );
};

export default UserModal;
