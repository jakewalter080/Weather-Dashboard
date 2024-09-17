# Weather-Dashboard

## Description

The Weather Dashboard is a web application that allows travelers to view weather outlooks for multiple cities, helping them plan their trips. This application retrieves weather data from the OpenWeather API and displays current and future weather conditions for searched cities.

### Project Goal
- AS A traveler
- I WANT to see the weather outlook for multiple cities
- SO THAT I can plan a trip accordingly


### Features

- Search for a city to view its current and future weather conditions
- Display of current weather including:

    - City name
    - Date
    - Weather icon
    - Weather description
    - Temperature
    - Humidity
    - Wind speed


- 5-day forecast showing:
    - Date
    - Weather icon
    - Temperature
    - Wind speed
    - Humidity

- Search history functionality
- Responsive design for various screen sizes

### Technologies Used

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- External API: OpenWeather API
- Deployment: Render

## Installation

1. Clone the repository:
``` 
git clone https://github.com/your-username/weather-dashboard.git
```

2. Navigate to the project directory:
```
cd weather-dashboard
```

3. Install dependencies:
```
npm install
```

4. Create a .env file in the root directory and add your OpenWeather API key:
```
OPENWEATHER_API_KEY=your_api_key_here
```

## Usage

1. Start the server:
```
npm start
```

2. Open a web browser and navigate to http://localhost:3000 (or the port specified in your environment).
3. Enter a city name in the search bar and click the search button.
4. View the current weather and 5-day forecast for the searched city.
5. Click on cities in the search history to quickly view their weather information again.

### API Reference
This application uses the OpenWeather 5-day forecast API. The base URL for API calls is:
```
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
```
For more information on how to use the OpenWeather API, please refer to their official documentation.

## Contribution

Thank you for your interest, if you would like to contribute reach out to me via email, or make additions on a feature branch for review.

## Testing

1. Ensure all dependencies are installed:
```
npm install
```
2. Run the test suite:
```
npm test
```

## Questions

Please feel free to contact me at:

[GitHub](https://github.com/jakewalter080)

[Email: jakewalter080@gmail.com](https://jakewalter080@gmail.com)