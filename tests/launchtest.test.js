const { getLaunches } = require('../services/upcomingLaunchAPI.js');

jest.setTimeout(10000);

test('should return launch data from the Launch Library API', async () => {
  const result = await getLaunches({ limit: 1 });

  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(1);

  const launch = result[0];
  expect(launch).toHaveProperty('mission');
  expect(launch).toHaveProperty('vehicle');
  expect(launch).toHaveProperty('launchDate');

  console.log('Real fetched', launch);
});