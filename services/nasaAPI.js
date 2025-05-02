require('dotenv').config();
const axios = require('axios');
const nasaK = process.env.NASA_KEY;

async function getNasaImage() {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaK}`);
      const { title, explanation, date, url } = response.data;
      return { title, explanation, date, url };
    } catch (error) {
      console.error(error);
      throw new Error('Error getting NASA data');
    }
  }

module.exports = { getNasaImage };
