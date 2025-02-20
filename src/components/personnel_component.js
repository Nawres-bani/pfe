import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlusSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Personnel() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    telephone: "",
    securiteSocial: "",
    cin: "",
    password: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/personnels");
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      telephone: "",
      securiteSocial: "",
      cin: "",
      password: "",
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

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/personnels/add_personnels", formData);
      getData();
      setShowAddModal(false);
      alert("Employé ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedRow) return;
    try {
      await axios.put(`http://localhost:5000/api/personnels/maj/${selectedRow._id}`, formData);
      getData();
      setShowEditModal(false);
      alert("Mise à jour réussie !");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedRow) return;
    try {
      await axios.delete(`http://localhost:5000/api/personnels/supprimer/${selectedRow._id}`);
      getData();
      setShowDeleteModal(false);
      alert("Employé supprimé !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gestion du Personnel</h2>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <FontAwesomeIcon icon={faPlusSquare} /> Ajouter
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Sécurité Sociale</th>
            <th>Date de Naissance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} onClick={() => handleRowClick(row)}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.telephone}</td>
                <td>{row.securiteSocial}</td>
                <td>{row.birthday}</td>
                <td>
                  <Button variant="warning" onClick={() => setShowEditModal(true)}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>{" "}
                  <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Aucun employé trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* MODAL AJOUT */}
      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(formData).map((key) => (
              <Form.Group key={key}>
                <Form.Label>{key.replace("_", " ")}</Form.Label>
                <Form.Control type="text" name={key} value={formData[key]} onChange={handleFormChange} />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ÉDITION */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(formData).map((key) => (
              <Form.Group key={key}>
                <Form.Label>{key.replace("_", " ")}</Form.Label>
                <Form.Control type="text" name={key} value={formData[key]} onChange={handleFormChange} />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Annuler
          </Button>
          <Button variant="warning" onClick={handleEditSubmit}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL SUPPRESSION */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer l'employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer cet employé ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
