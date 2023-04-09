import React, { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Table } from "react-bootstrap";
import LocationAddModal from "../components/LocationAddModal";
import axios from "axios";
import LocationEditModal from "../components/LocationEditModal";
import Navigation from "../components/Navigation";

const BASE = `https://example-brocode.onrender.com/locations`;

const Locations = () => {
  const [ addModalShow, setAddModalShow ] = useState(false);
  const [locations, setLocations] = useState([]);
  const [ editModalShow, setEditModalShow ] = useState(false)
  const [toBeEdited, setToBeEdited] = useState({})

  useEffect(() => {
    axios.get(BASE).then((response) => {      
      setLocations(response.data);
    });
  }, [addModalShow, editModalShow]);

  const handleEdit = (location) => {    
    const temp = {...location}
    setToBeEdited(temp)
    setEditModalShow(true)
  };

  const handleDelete = (id) => {
    axios
      .delete(`${BASE}/${id}`).then((response) => {        
        
        axios.get(BASE).then((response) => {      
          setLocations(response.data);
        });
      })
  }

  return (
    <Fragment>
    <Navigation />
    <div className="mt-4">
      <Container>
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            {" "}
            <Button variant="primary" onClick={() => setAddModalShow(true)}>
              Add Location
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={3}></Col>
          <Col md={6}>
            <Table striped bordered hover>
              <thead>
                <tr className="table-dark">
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => {
                  return (
                    <tr key={location._id}>
                      <td>{location.city}</td>
                      <td>{location.state}</td>
                      <td>{location.country}</td>
                      <td className="d-flex justify-content-center">
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEdit(location)}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(location._id)}>Delete</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>      
      <LocationAddModal show={addModalShow} onHide={() => setAddModalShow(!addModalShow)} />
      <LocationEditModal show={editModalShow} onHide={() => setEditModalShow(false)} data={toBeEdited}/>
    </div>
    </Fragment>
  );
};

export default Locations;
