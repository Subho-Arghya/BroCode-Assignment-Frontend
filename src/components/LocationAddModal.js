import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const LocationAddModal = (props) => {
  const [inputValue, setInputValue] = useState({
    city: "",
    state: "",
    country: "",
  });
  

  const handleInputData = (e) => {
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

    let newLoc = { ...inputValue };
    console.log(newLoc);
    axios
      .post(`https://example-brocode.onrender.com/locations`, newLoc)
      .then((response) => {
        console.log(response);
        setInputValue({ city: "", state: "", country: "" });
      });
  };

  return (
    <Modal {...props} size="md" centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add/Edit Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleAdd(e)}>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={inputValue.city}
              onChange={(e) => handleInputData(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              name="state"
              value={inputValue.state}
              onChange={(e) => handleInputData(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              name="country"
              value={inputValue.country}
              onChange={(e) => handleInputData(e)}
            />
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

export default LocationAddModal;
