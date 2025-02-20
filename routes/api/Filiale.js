const axios = require("axios");

const API_URL = "https://api.example.com/filiales";

// Get Filiales function
const getFiliales = async () => {
  // Your code here to fetch and return filiales
};

// Create Filiale function
const createFiliale = async (filiale) => {
  const response = await axios.post(API_URL, filiale);
  return response.data;
};

// Export the functions using CommonJS syntax
module.exports = { getFiliales, createFiliale };
