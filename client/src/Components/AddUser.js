import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function AddUserModal({ addUser, show, onHide }) {
    const [userName, setUserName] = useState('');
    const [userTitle, setUserTitle] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const addUserDetails = () => {
        let newDetails = {
            'name': userName,
            'title': userTitle,
            'department': userDepartment,
            'location': userLocation,
            'email': userEmail
        };

        addUser(newDetails);
    }

    return (
        <Modal 
      show = {show}
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New employee details
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={addUserDetails}>      
        <Modal.Body>
          <Form.Row id="formGroupName">
            <Form.Label column sm="4">Name</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} className="mr-sm-2" />
            </Col>
          </Form.Row>
          <Form.Row id="formGroupTitle">
            <Form.Label column sm="4">Title</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" placeholder="Title" onChange={(e) => setUserTitle(e.target.value)} className="mr-sm-2"/>
            </Col>
          </Form.Row>
          <Form.Row id="formGroupDepartment">
            <Form.Label column sm="4">Department</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" placeholder="Department" onChange={(e) => setUserDepartment(e.target.value)} className="mr-sm-2"/>
            </Col>
          </Form.Row>
          <Form.Row id="formGroupLocation">
            <Form.Label column sm="4">Location</Form.Label>
            <Col sm="8">
              <Form.Control type="text" placeholder="Location" onChange={(e) => setUserLocation(e.target.value)} className="mr-sm-2"/>
            </Col>
          </Form.Row>
          <Form.Row id="formGroupEmail">
            <Form.Label column sm="4">Email address</Form.Label>
            <Col sm="8">
              <Form.Control type="email" placeholder="Email address" onChange={(e) => setUserEmail(e.target.value)} className="mr-sm-2"/>
            </Col>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
        <Button type="submit">Create user</Button>
        </Modal.Footer>
      </Form>
    </Modal>
    );
}

export default AddUserModal;