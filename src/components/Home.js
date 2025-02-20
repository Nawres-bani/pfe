import React from 'react';
import './Home.css'; // Assurez-vous d'importer le fichier CSS pour styliser la navbar
import logo from './logo.jpg'; // Importez votre logo
//import image from './personnel.jpg';
//import imagef from './filiale.jpg';


const Home = () => {
  // Fonction pour gérer la déconnexion
  const logOut = () => {
    localStorage.removeItem("loggedIn"); // Supprime l'état de connexion
    window.location.href = "/sign-in"; // Redirige vers la page de connexion
  };

  return (
    <div className="wrapper-editor">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" className="navbar-logo" /> {/* Affichage du logo */}
          Gestion Employee
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/personnel">
                personnel
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Filiale">
                Filiale
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/historique">
                historique
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logOut}>
                <strong>Déconnexion</strong>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenu de la page Home */}
      <div className="home-content container py-5">
        <h1 className="text-center text-dark mb-4">Bienvenue dans l'application de gestion Employee </h1>
        

        {/* Cards Section */}
        <div className="row">
          {/* Card Personnel */}
          <div className="col-md-6 mb-4">
            <div className="card professional-card">
              <img src="personnel.jpg" className="card-img-top rounded" alt="Personnel" />
              <div className="card-body">
                <h5 className="card-title">Personnel</h5>
                <p className="card-text">
                  <strong>Nombre d'employés :</strong> 120
                </p>
                <a href="/personnel" className="btn btn-primary">Gérer</a>
              </div>
            </div>
          </div>

          {/* Card Filiale */}
          <div className="col-md-6 mb-4">
            <div className="card professional-card">
              <img src="filiale.jpg" className="card-img-top rounded" alt="Filiale" />
              <div className="card-body">
                <h5 className="card-title">Filiale</h5>
                <p className="card-text">
                  <strong>Nombre de filiales :</strong> 5
                </p>
                <a href="/Filiale*" className="btn btn-primary">Gérer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
