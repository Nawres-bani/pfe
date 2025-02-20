import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryComponent = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/history");
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement de l'historique :", err);
        setError("Impossible de charger l'historique");
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Chargement de l'historique...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Historique des Actions</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Action</th>
            <th>Personnel Affecté</th>
            <th>Détails</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.user}</td>
              <td>{entry.action === "modification" ? "Modification" : "Suppression"}</td>
              <td>{entry.personnelId ? `${entry.personnelId.fname} ${entry.personnelId.lname}` : "Inconnu"}</td>
              <td>{entry.details}</td>
              <td>{new Date(entry.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryComponent;
