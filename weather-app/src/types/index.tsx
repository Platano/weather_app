export const TIME_FORMAT = 12;
export const MAX_DEGREE = 360
export const COMPASS_SECTORS = 22.5

export interface Day{
    description : string;
    humidity : number;
    main : string;
    pressure: number;
    temp : Temp;
    weather_icon : string;
}

export interface Temp {
    max : number;
    min : number;
}

export interface Hour {
  temp: string;
  main: string;
  pop : number;
  description: string;
  wind_speed : string;
  wind_deg : string;
  weather_icon : string;
}

export interface Current {
    date : string;
    time : string;
    temp : number;
    feels_like : number;
    uvindex : number;
    humidity : number;
    dew_point : number;
    pressure : number;
    main : string;
    description : string;
    weather_icon : string;
    wind_speed : string;
    wind_deg : string;
    clouds : number;
}

export interface Hourly {
    time : number;
    data : Hour;
}

export interface Daily {
    day : string;
    data : Day;
}

export interface WeatherData {
    city : string;
    country : string;
    current : Current;
    daily : Daily[];
    hourly : Hourly[];
    state : string;   
}
