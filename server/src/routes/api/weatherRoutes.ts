import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';
// import { City } from '../../service/historyService.js';
import { City } from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
// check if the city name is provided
try {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(city);
  // TODO: save city to search history
  await HistoryService.addCity(city);

  res.json(weatherData);
} catch (error) {
  console.error('Error fetching weather data:', error);
  res.status(500).json({ error: 'Failed to fetch weather data' });
}
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error removing city from search history:', error);
    res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

export default router;
