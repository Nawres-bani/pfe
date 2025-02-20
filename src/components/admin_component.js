import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faPencilSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({
    fname: "",
    lname: "",
    email: "",
    telephone: "",
    profile: "",
    cin: "",
    password: "",
    role: "User",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    telephone: "",
    profile: "",
    cin: "",
    password: "",
    role: "User",
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedRow) {
      setEditedData({ ...selectedRow });
    }
  }, [selectedRow]);

  const getData = () => {
    axios.get(`http://localhost:3001/api/users`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/api/users/supprimer/${id}`)
      .then(() => {
        getData();
        alert("Row deleted successfully");
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  const onEdit = (id) => {
    const selected = data.find(row => row._id === id);
    setSelectedRow(selected);
    setShowEditModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setFormData({
      fname: "",
      lname: "",
      email: "",
      telephone: "",
      profile: "",
      cin: "",
      password: "",
      role: "User",
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedRow(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleFormChange = (e, fieldName) => {
    setEditedData({
      ...editedData,
      [fieldName]: e.target.value,
    });
  };

  const handleForm = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleAddSubmit = () => {
    axios.post("http://localhost:3001/api/users/register", formData)
      .then(() => {
        getData();
        setShowAddModal(false);
        alert("Row added successfully");
      })
      .catch((error) => {
        console.error("Error adding row:", error);
      });
  };

  const handleEditSubmit = () => {
    axios.put(`http://localhost:3001/api/users/maj/${selectedRow._id}`, editedData)
      .then(() => {
        getData();
        setShowEditModal(false);
        alert("Row edited successfully");
      })
      .catch((error) => {
        console.error("Error editing row:", error);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./utilisateur";
  };

  return (
    
    <div className="wrapper-editor">
  
      <div className="row d-flex justify-content-center modalWrapper">
        <Modal show={showAddModal} onHide={handleAddModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formfname">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="fname"
                  value={formData.fname}
                  onChange={(e) => handleForm(e, 'fname')}
                />
              </Form.Group>
              <Form.Group controlId="formlname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={(e) => handleForm(e, 'lname')}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleForm(e, 'email')}
                />
              </Form.Group>
              
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Phone Number"
                  name="telephone"
                  value={formData.telephone}
                  onChange={(e) => handleForm(e, 'telephone')}
                />
              </Form.Group>
              <Form.Group controlId="profile">
                <Form.Label>Profile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter profile"
                  name="profile"
                  value={formData.profile}
                  onChange={(e) => handleForm(e, 'profile')}
                />
              </Form.Group>
              <Form.Group controlId="formCin">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CIN"
                  name="cin"
                  value={formData.cin}
                  onChange={(e) => handleForm(e, 'cin')}
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Check
                  type="radio"
                  label="User"
                  name="role"
                  value="User"
                  checked={formData.role === "User"}
                  onChange={(e) => handleForm(e, 'role')}
                />
                <Form.Check
                  type="radio"
                  label="Admin"
                  name="role"
                  value="Admin"
                  checked={formData.role === "Admin"}
                  onChange={(e) => handleForm(e, 'role')}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleAddModalClose}>Close</Button>
            <Button variant="primary" onClick={handleAddSubmit}>Add form</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {selectedRow && (
                <>
                  <Form.Group controlId="formfnameEdit">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedData.fname}
                      onChange={(e) => handleFormChange(e, 'fname')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formlnameEdit">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedData.lname}
                      onChange={(e) => handleFormChange(e, 'lname')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmailEdit">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleFormChange(e, 'email')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhoneEdit">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={editedData.telephone}
                      onChange={(e) => handleFormChange(e, 'telephone')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formProfileEdit">
                    <Form.Label>Profile</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedData.profile}
                      onChange={(e) => handleFormChange(e, 'profile')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formCinEdit">
                    <Form.Label>CIN</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedData.cin}
                      onChange={(e) => handleFormChange(e, 'cin')}
                    />
                  </Form.Group>
                  <Form.Group controlId="formRoleEdit">
                    <Form.Check
                      type="radio"
                      label="User"
                      name="role"
                      value="User"
                      checked={editedData.role === "User"}
                      onChange={(e) => handleFormChange(e, 'role')}
                    />
                    <Form.Check
                      type="radio"
                      label="Admin"
                      name="role"
                      value="Admin"
                      checked={editedData.role === "Admin"}
                      onChange={(e) => handleFormChange(e, 'role')}
                    />
                  </Form.Group>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleEditModalClose}>Close</Button>
            <Button variant="secondary" onClick={handleEditSubmit}>Edit form</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRow && (
              <p className="text-center h4">Are you sure to delete {selectedRow.email}?</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => onDelete(selectedRow._id)}>Yes</Button>
            <Button variant="primary" onClick={handleDeleteModalClose}>No</Button>
          </Modal.Footer>
        </Modal>

        <div className="text-center">
          <Button variant="warning" onClick={() => setShowAddModal(true)}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </Button>
          <Button variant="info" onClick={() => setShowEditModal(true)} disabled={!selectedRow}>
            <FontAwesomeIcon icon={faPencilSquare} />
          </Button>
          <Button variant="danger" disabled={!selectedRow} onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>

      <Table id="dtBasicExample" className="table table-striped table-bordered" cellSpacing="0" width="80%">
        <thead>
          <tr>
            <th className="th-sm">Name</th>
            <th className="th-sm">Email</th>
            <th className="th-sm">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => handleRowClick(row)}>
              <td>{row.fname}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


