export interface Day {
  description: string;
  humidity: number;
  main: string;
  pressure: number;
  temp: Temp;
  weather_icon: string;
}

export interface Temp {
  max: number;
  min: number;
}

export interface Hour {
  temp: number;
  main: string;
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
  dew_point: number;
  pressure: number;
  main: string;
  description: string;
  weather_icon: string;
  wind_speed: number;
  wind_deg: number;
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
