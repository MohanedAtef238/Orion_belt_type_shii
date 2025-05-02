const { startISSPolling, getLatestISSData } = require('../services/spaceStationAPI.js');

console.log('Starting ISS polling');
startISSPolling();

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// this test is not only ensuring we can fetch data but that the data is updated every 10 seconds
async function runTest() {
  console.log('trying to fetch ISS data for the first time');
  await wait(1000);
  const first = getLatestISSData();
  console.log('First ISS Data', first);
  if (!first) {
    console.error('data not found');
    return;
  }
  console.log('waiting for data to update');
  await wait(11000);
  const second = getLatestISSData();
  console.log('updated ISS Data after', second);

  if (first.timestamp !== second.timestamp) {
    console.log('Test passed');
  } else {
    console.error('Test failed');
  }
}

runTest();