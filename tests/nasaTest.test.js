jest.setTimeout(10000);
const { getNasaImage } = require('../services/nasaAPI.js');

test('should return valid APOD data from NASA API', async () => {
  const data = await getNasaImage();
  expect(data).toHaveProperty('title');
  expect(data).toHaveProperty('explanation');
  expect(data).toHaveProperty('date');
  expect(data).toHaveProperty('url');
});
