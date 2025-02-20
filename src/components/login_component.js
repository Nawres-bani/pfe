import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Vérification que les champs ne sont pas vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "usernotok" || data.status === "passnotok") {
        setError("Email ou mot de passe incorrect.");
      } else if (data.status === "ok") {
        alert("Connexion réussie !");
        
        // Stocker les informations de session
        window.localStorage.setItem("loggedIn", "true");
        window.localStorage.setItem("userRole", data.role);
        window.localStorage.setItem("token", data.token); // Stocke le JWT pour l'authentification future

        // Redirection selon le rôle
        if (data.role === "Admin") {
          navigate("/admin");
        } else if (data.role === "User") {
          navigate("/Home");
        } else {
          setError("Rôle inconnu.");
        }
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Erreur lors de la connexion. Veuillez réessayer.");
    }
  }

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: 'url("log.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card shadow-lg" style={{ borderRadius: "15px", backgroundColor: "rgba(255, 255, 255, 0.75)", border: "none", backdropFilter: "blur(15px)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}>
              <div className="card-body p-4">
                <h2 className="text-center mb-4" style={{ color: "#444", fontWeight: "700" }}>Login</h2>

                <form onSubmit={handleSubmit}>
                  {error && <p className="text-danger text-center">{error}</p>}

                  <div className="form-outline mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ borderRadius: "12px", border: "1px solid #ccc", padding: "14px", fontSize: "16px" }}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ borderRadius: "12px", border: "1px solid #ccc", padding: "14px", fontSize: "16px" }}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-gradient" style={{ backgroundImage: "linear-gradient(to right, #6A82FB, #FC5C7D)", color: "#fff", padding: "12px 30px", borderRadius: "30px", fontWeight: "600", border: "none", boxShadow: "0 4px 12px rgba(252, 92, 125, 0.5)" }}>
                      Login
                    </button>
                  </div>

                  <p className="text-center text-muted mt-4 mb-0">
                    Pas encore de compte ? <a href="/sign-up" className="text-gradient" style={{ color: "#6A82FB", fontWeight: "bold", textDecoration: "underline" }}>Inscrivez-vous ici</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
