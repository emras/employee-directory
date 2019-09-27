import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function UserDetailModal({ user, updateUser, deleteUser, show, onHide }) {
    const [userName, setUserName] = useState(user.name);
    const [userTitle, setUserTitle] = useState(user.title);
    const [userDepartment, setUserDepartment] = useState(user.department);
    const [userLocation, setUserLocation] = useState(user.location);
    const [userEmail, setUserEmail] = useState(user.email);
    const [updateMode, setUpdateMode] = useState(false)
    const [valid, setValidation] = useState(true);

    const isValid = () => {
      return userName !== ''
        && userTitle !== ''
        && userDepartment !=='';
    }

    const updateUserDetails = () => {      
        let newDetails = {
            'id': user.id,
            'name': userName,
            'title': userTitle,
            'department': userDepartment,
            'location': userLocation,
            'email': userEmail
        };
        updateUser(newDetails);
        setUpdateMode(false);
    }

    const displayForm = () => {
        if (updateMode) {
            return <Form>      
              <Modal.Body>
                <Form.Row>
                  <Image src={user.picture} roundedCircle />
                </Form.Row>
                <Form.Row id="formGroupName">
                  <Form.Label column sm="4">Name</Form.Label>
                  <Col sm="8">
                    <Form.Control required type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="mr-sm-2" />
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupTitle">
                  <Form.Label column sm="4">Title</Form.Label>
                  <Col sm="8">
                    <Form.Control required type="text" placeholder="Title" value={userTitle} onChange={(e) => setUserTitle(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupDepartment">
                  <Form.Label column sm="4">Department</Form.Label>
                  <Col sm="8">
                    <Form.Control required type="text" placeholder="Department" value={userDepartment} onChange={(e) => setUserDepartment(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupLocation">
                  <Form.Label column sm="4">Location</Form.Label>
                  <Col sm="8">
                    <Form.Control type="text" placeholder="Location" value={userLocation} onChange={(e) => setUserLocation(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupEmail">
                  <Form.Label column sm="4">Email address</Form.Label>
                  <Col sm="8">
                    <Form.Control type="email" placeholder="Email address" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" disabled={!isValid()} onClick={() => updateUserDetails()}>Save changes</Button>
                <Button variant="outline-dark" onClick={() => setUpdateMode(false)}>Cancel</Button>
              </Modal.Footer>
            </Form>
        } else {
            return <Form>      
              <Modal.Body>
                <Form.Row>
                  <Image src={user.picture} roundedCircle />
                </Form.Row>
                <Form.Row id="formGroupName">
                  <Form.Label column sm="4">Name</Form.Label>
                  <Col sm="8">
                    <Form.Control readOnly plaintext type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="mr-sm-2" />
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupTitle">
                  <Form.Label column sm="4">Title</Form.Label>
                  <Col sm="8">
                    <Form.Control readOnly plaintext type="text" placeholder="Title" value={userTitle} onChange={(e) => setUserTitle(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupDepartment">
                  <Form.Label column sm="4">Department</Form.Label>
                  <Col sm="8">
                    <Form.Control readOnly plaintext type="text" placeholder="Department" value={userDepartment} onChange={(e) => setUserDepartment(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupLocation">
                  <Form.Label column sm="4">Location</Form.Label>
                  <Col sm="8">
                    <Form.Control readOnly plaintext type="text" placeholder="Location" value={userLocation} onChange={(e) => setUserLocation(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
                <Form.Row id="formGroupEmail">
                  <Form.Label column sm="4">Email address</Form.Label>
                  <Col sm="8">
                    <Form.Control readOnly plaintext type="text" placeholder="Email address" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mr-sm-2"/>
                  </Col>
                </Form.Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => setUpdateMode(true)}>Update details</Button>
                <Button variant="outline-dark" onClick={() => deleteUser(user.id)}>Delete</Button>
              </Modal.Footer>
            </Form>
        }
    }

    return (
      <Modal 
        show = {show}
        onHide = {onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Employee Details
          </Modal.Title>
        </Modal.Header>
        {displayForm()}
      </Modal>
    );
}

export default UserDetailModal;