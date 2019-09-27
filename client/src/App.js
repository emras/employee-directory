import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Paginator from 'react-hooks-paginator';

import User from "./Components/User";
import UserDetailModal from "./Components/UserDetail";
import AddUserModal from "./Components/AddUser";
import axios from "./Client";

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [queryString, setQueryString] = useState('');
    const pageLimit = 9;


    // fetch users and filter based on search string
    useEffect(() => {
        if (!users.fetched) {
            axios.get('/users').then((response) => {
                let users = response.data.filter(user => {
                    return user.name.toLowerCase().includes(queryString);
                });
                setUsers(users);
                users.fetched = true;
            });
        }
    });

    // pagination
    useEffect(() => {
        setCurrentUsers(users.slice(offset, offset + pageLimit));
    }, [offset, users]);

    const deleteUser = (id, index) => {
        axios.delete('/users/' + id).then((response) => {
            const newUsers = [...users];
            newUsers.splice(index, 1);
            setUsers(newUsers);
            setShowDetailModal(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateUser = (user, index) => {
        axios.put('/users/' + user.id, { name: user.name, title: user.title, department: user.department, location: user.location, email: user.email })
            .then(function(response) {
                const newUsers = [...users];
                newUsers[index] = response.data;
                setUsers(newUsers);
            }).catch((err) => {
                console.log(err);
            });
    }

    const addUser = (user) => {
        axios.post('/users/', { name: user.name, title: user.title, department: user.department, location: user.location, email: user.email })
            .then(function(response) {
                const newUsers = [...users, response.data];
                setUsers(newUsers);
                setShowAddModal(false);
            }).catch((err) => {
                console.log(err);
            });
    }

    const getUserDetails = (user) => {
        axios.get('/users/' + user.id)
            .then(function(response) {
                setSelectedUser(response.data);
                setShowDetailModal(true);
            }).catch((err) => {
                console.log(err);
            });
    }

    const searchUsers = (e) => {
        const query = e.target.value;
        setQueryString(query.toLowerCase());
        const filteredUsers = users.filter(u => {
            return u.name.toLowerCase().includes(queryString);
        })

        setUsers(filteredUsers);
    };

    const allUsersDiv = () => {
        return currentUsers.map((user) => {
            return <User 
          userData={user} 
          key={user.id}
          selectUser={getUserDetails} />
        });
    }

    const userDetailModal = () => {
        if (selectedUser != null) {
            return <UserDetailModal
          key={`details`+selectedUser.id}
          user={selectedUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}/>
        }
    }

    return (
      <div>
        <Navbar bg="primary" variant="primary" fixed="top">
          <Form inline>
            <Form.Control type="text" placeholder="Search by name..." className="mr-sm-2" onChange={(e) => searchUsers(e)} />
          </Form>
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
            key='bottom'
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-bottom'>
                Add new employee
              </Tooltip>
            }>
              <Button className="pull-right" variant="light" onClick={() => setShowAddModal(true)}>+</Button>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Navbar>
        <AddUserModal 
          addUser={addUser}
          show={showAddModal}
          onHide={() => setShowAddModal(false)}/>
        {userDetailModal()}
        <CardColumns>{allUsersDiv()}</CardColumns>
        <Paginator
          totalRecords={users.length}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
}

export default App;