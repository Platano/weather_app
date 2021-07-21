export const TIME_FORMAT = 12;

export interface Day{
    description : string;
    dew_point : number;
    feels_like : FeelsLike;
    humidity : number;
    main : string;
    pressure: number;
    temp : Temp;
    uvindex : number;
    wind_speed : number;
}

export interface FeelsLike {
    day : number;
    eve : number;
    morn : number;
    night : number;
}

export interface Temp {
    day : number;
    eve : number;
    max : number;
    min : number;
    morn : number;
    night : number;
}

export interface Hour {
  clouds: number;
  description: string;
  dew_point: number;
  feels_like: number;
  humidity: number;
  main: string;
  pressure: number;
  temp: string;
  uvindex: number;
  wind_speed: number;
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
    wind_speed : string;
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
