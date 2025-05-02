const axios = require('axios');

let latestISS = null;

async function getISSLocation() {
  try {
    const res = await axios.get('http://api.open-notify.org/iss-now.json');
    const { timestamp, iss_position } = res.data;
    const { latitude, longitude } = iss_position;

    latestISS = {
      timestamp: new Date(timestamp * 1000).toISOString(),
      lat: latitude,
      long: longitude
    };
    console.log('Updated Location');
  } catch (error) {
    console.error(error.message);
  }
}

// Wrapper to start polling every 10s so i can always have clean data or the most recent data
function startISSPolling() {
  getISSLocation();
  setInterval(getISSLocation, 10000);
}
// this is what the main server will call to get the latest data
function getLatestISSData() {
  return latestISS;
}

module.exports = {startISSPolling,getLatestISSData};
