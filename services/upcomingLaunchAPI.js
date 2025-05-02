const axios = require('axios');
// https://ll.thespacedevs.com/2.3.0/launches/ i pulled my info from this
async function getLaunches({ status, date, limit = 1 }) {
  const baseURL = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/';
  const params = new URLSearchParams();
  params.append('limit', limit);
  if (status) {params.append('status', status);} //these were fetched from their documentation not sure if i understand them correctly but time is of the essence or whatever people say and its11:30pm
  if (date) {params.append('window_end__gte', date);}
  try {
    const response = await axios.get(`${baseURL}?${params.toString()}`);
    const results = response.data.results;
    return results.map((launch) => ({ // mapping the list of results into a more readable format but i am not sure if this is the best approach
      mission: launch.name,
      vehicle: launch.rocket.configuration.name,
      launchDate: launch.net,
    }));
  } catch (err) {
    console.error(err);
  }
}
module.exports = { getLaunches };
