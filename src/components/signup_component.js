import React, { useState } from "react";

export default function SignUp() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fname, lname, email, password);
    fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert("Registration successful");
        window.location.href = "./sign-in";
      });
  };

  return (
    <section
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("log2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body p-4">
                <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "700" }}>Register</h2>
  
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      placeholder="Your First Name"
                      className="form-control"
                      onChange={(e) => setFName(e.target.value)}
                      style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "14px", fontSize: "16px" }}
                    />
                  </div>
  
                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      placeholder="Your Last Name"
                      className="form-control"
                      onChange={(e) => setLName(e.target.value)}
                      style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "14px", fontSize: "16px" }}
                    />
                  </div>
  
                  <div className="form-outline mb-3">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "14px", fontSize: "16px" }}
                    />
                  </div>
  
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "14px", fontSize: "16px" }}
                    />
                  </div>
  
                  <div className="form-outline mb-4">
                    <div
                      className="form-check p-3"
                      style={{
                        backgroundImage: "linear-gradient(to right, #667eea, #764ba2)",
                        borderRadius: "30px",
                        color: "#fff",
                        boxShadow: "0 4px 8px rgba(118, 75, 162, 0.3)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        value="User"
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                          accentColor: "#fff",
                          marginRight: "4px",
                          transform: "scale(0.8)",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      <label className="form-check-label ms-2" style={{ color: "#fff" }}>
                        User
                      </label>
                    </div>
                  </div>
  
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        backgroundImage: "linear-gradient(to right, #667eea, #764ba2)",
                        color: "#fff",
                        padding: "12px 30px",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 8px rgba(118, 75, 162, 0.5)",
                      }}
                    >
                      Register
                    </button>
                  </div>
  
                  <p className="text-center text-muted mt-4 mb-0">
                    Already have an account?{" "}
                    <a href="/sign-in" className="text-primary fw-bold" style={{ textDecoration: "underline" }}>
                      Login here
                    </a>
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
