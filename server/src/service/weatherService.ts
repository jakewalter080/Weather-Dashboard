import dotenv from 'dotenv';
// import { query, response } from 'express';
// import { url } from 'inspector';
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
  // getWeather = async (city: string) => {
  
  // TODO: Define the baseURL, API key, and city name properties
  private apiKey: string;
  private forecastURL: string;
  private baseURL: string;
  private cityName: string;
  private searchHistory: string[] = [];
  

  // Remove the 'private' keyword before the constructor
  constructor(
    baseURL: string = "https://api.openweathermap.org/data/2.5",
    forecastURL: string = 'https://api.openweathermap.org/data/2.5/forecast',
    apiKey: string = process.env.WEATHER_API_KEY || '',
    cityName: string = `Chicago`
  ) {
    this.baseURL = baseURL;
    this.forecastURL = forecastURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
    if (!this.apiKey) {
      throw new Error('Weather API key is not set in environment variables');
    }
  }
}
  // TODO: Create fetchLocationData method
    private async fetchLocationData = async (query: string): Promise<Coordinates> => {
      const geocodeURL: string = `${this.baseURL}geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
      const response: Response = await fetch(geocodeURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: any = await response.json();
      return this.destructureLocationData(data[0]);
    }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  }
}
  


  // Call the destructureLocationData method somewhere in your code
  // const locationData: Coordinates = {
  //   latitude: 0,
  //   longitude: 0
  // };
  // const destructuredData = this.destructureLocationData(locationData);


  
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(): string {
    return this.cityName;
  }
  
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const geocodeQuery = `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=imperial`;
    return geocodeQuery;
  }

  private buildForecastQuery(coordinates: Coordinates): string {
    const buildForcastQuery = `${this.baseURL}forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=imperial`;
    return buildForcastQuery;
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    return await this.fetchLocationData(query);
  }
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  private async fetchForecastData(coordinates: Coordinates): Promise<any> {
    const url = this.buildForecastQuery(coordinates);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
  
  // TODO: Build parseCurrentWeather method
  private parseWeather(data: any, cityName: string): Weather {
    return new Weather(
      new Date(data.dt * 1000),
      cityName,
      data.weather[0].icon,
      data.weather[0].description,
      data.main.temp,
      data.main.humidity,
      data.wind.speed
    );
  }
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
  //   const forecastArray: Weather[] = [];
  //   for (let i = 0; i < weatherData.length; i++) {
  //     const date = new Date(weatherData[i].dt * 1000);
  //     const cityName = currentWeather.cityName;
  //     const iconCode = weatherData[i].weather[0].icon;
  //     const description = weatherData[i].weather[0].description;
  //     const temperature = weatherData[i].main.temp;
  //     const humidity = weatherData[i].main.humidity;
  //     const windSpeed = weatherData[i].wind.speed;
  //     forecastArray.push(new Weather(date, cityName, iconCode, description, temperature, humidity, windSpeed));
  //   }
  //   return forecastArray;
  // }
  private buildForecastArray(forecastData: any, cityName: string): Weather[] {
    return forecastData.list
      .filter((_: any, index: number) => index % 8 === 0) // Get one forecast per day
      .slice(0, 5) // Limit to 5 days
      .map((item: any) => this.parseWeather(item, cityName));
  }
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<{ current: Weather, forecast: Weather[] }> {
    this.cityName = city,
    const coordinates: Coordinates = await this.fetchAndDestructureLocationData(),
    const weatherData: any = await this.fetchWeatherData(coordinates),
    const forecastData: any = await this.fetchForecastData(coordinates),
  
    const currentWeather: Weather = this.parseWeather(weatherData, city),
    const forecast: Weather[] = this.buildForecastArray(forecastData, city),
  
    this.addToSearchHistory(city),
  
    return { current: currentWeather, forecast },
  }
  
  // TODO: Define the Coordinates interface
  interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  private addToSearchHistory(city: string): void {
    if (!this.searchHistory.includes(city)) {
      this.searchHistory.unshift(city);
      if (this.searchHistory.length > 10) { // Limit history to 10 items
        this.searchHistory.pop();
      }
    }
  }
}

// export default new WeatherService();
// function fetchLocationData(query: (options: import("qs").IParseOptions<undefined> | { (str: string, options?: (import("qs").IParseOptions<import("qs").BooleanOptional> & { decoder?: undefined; }) | undefined): import("qs").ParsedQs; (str: string | Record<string, string>, options?: import("qs").IParseOptions<import("qs").BooleanOptional> | undefined): { [key: string]: unknown; }; }) => import("express").Handler, string: any) {
//   throw new Error('Function not implemented.');
// }

export default new WeatherService();

