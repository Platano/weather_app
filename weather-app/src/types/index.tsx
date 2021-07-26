export interface Day {
  description: string;
  temp: Temp;
  weather_icon: string;
}

export interface Temp {
  max: number;
  min: number;
}

export interface Hour {
  temp: number;
  pop: number;
  description: string;
  wind_speed: number;
  wind_deg: number;
  weather_icon: string;
}

export interface Current {
  date: string;
  time: string;
  temp: number;
  feels_like: number;
  uvindex: number;
  humidity: number;
  pressure: number;
  description: string;
  weather_icon: string;
  wind_speed: number;
  wind_deg: number;
  sunrise: string;
  sunset: string;
}

export interface Hourly {
  time: number;
  data: Hour;
}

export interface Daily {
  day: string;
  date: string;
  data: Day;
}

export interface WeatherData {
  city: string;
  country: string;
  current: Current;
  daily: Daily[];
  hourly: Hourly[];
  state: string;
}
