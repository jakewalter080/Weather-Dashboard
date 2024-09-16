import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
  interface Coordinates {
    latitude: number;
    longitude: number;
  }

// TODO: Define a class for the Weather object
class Weather {
  date: Date;
  cityName: string;
  iconCode: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(
    date: Date,
    cityName: string,
    iconCode: string,
    description: string,
    temperature: number,
    humidity: number,
    windSpeed: number
  ) {
    this.date = date;
    this.cityName = cityName;
    this.iconCode = iconCode;
    this.description = description;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private apiKey: string;
  private baseURL: string;
  private cityName: string;
  private searchHistory: string[] = [];

  constructor(
    baseURL: string = 'https://api.openweathermap.org/data/2.5/',
    apiKey: string = process.env.WEATHER_API_KEY || '',
    cityName: string = `Chicago`
  ) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }
}
  // TODO: Create fetchLocationData method
    // private async fetchLocationData(query: string) {}

  public async fetchLocationData(query: string): Promise<Coordinates> {
    const geocodeURL = `${this.baseURL}geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(geocodeURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return this.destructureLocationData(data[0]);
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon
    };
  }
  
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(): string {
    return this.cityName;
  }
  
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=imperial`;
  }

  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.baseURL}forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=imperial`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    return await this.fetchLocationData(query);
  }
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
 
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
