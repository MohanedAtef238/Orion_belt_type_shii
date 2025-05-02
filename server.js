const express = require('express');
const { getNasaImage } = require('./services/nasaAPI.js');
const { startISSPolling,getLatestISSData } = require('./services/spaceStationAPI.js');
const { getLaunches } = require('./services/upcomingLaunchAPI.js');

const app = express();
const PORT = 3000;
startISSPolling(); // Start polling for ISS location so we can start fetching the most recent data whenver we pull it
app.get('/nasaIOTD', async (req, res) => {
  try {
    const data = await getNasaImage();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/ISS', async (req, res) => {
    try {
      const data = await getLatestISSData();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.get('/Launches', async (req, res) => {
  try {
    const data = await getLaunches();
    res.json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
