import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';

function User({ userData, index, selectUser }) {
  return (
    <Card className="text-center" onClick={() => selectUser(userData)}>
        <Card.Img variant="top" src={userData.picture}/>
        <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Text>
            <span className="text-muted">{userData.title}</span> <br/>
            <span className="text-muted">{userData.department}</span><br/>
            <span className="text-muted">{userData.location}</span><br/>
            <span className="text-muted">{userData.email}</span><br/>
        </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default User;