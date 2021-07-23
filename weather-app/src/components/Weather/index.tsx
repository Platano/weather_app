import axios, { AxiosResponse } from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import SearchField from "react-search-field";
import { TIME_FORMAT, WeatherData } from '../../types';
import "./../../assets/css/tailwind.css";

export function Weather() : React.ReactElement {
  const [location, setLocation] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [error, setError] = useState(null);
  
  
  function weatherInfo<T>(loc : string): Promise<AxiosResponse<T>>{
    return axios.get<T>(`http://localhost:8000/weather/${loc}`, {
      headers: { "Access-Control-Allow-Origin": true },
    });
  }


  useEffect(() => {
    async function getWeatherData(loc: string) {
      try {
        
        const response = await weatherInfo<WeatherData>(loc);
        setWeatherData(response.data);
      } catch (err) {
        setError(err);
        console.log(`Error: ${error.message}`);
      }
    }
    getWeatherData(location);  
  }, [location])


  return (
    <div className="text-center">
      <SearchField
        placeholder="Enter location..."
        onSearchClick={(e: string) =>
          setLocation(e.charAt(0).toUpperCase() + e.slice(1))
        }
        onEnter={(e: string) =>
          setLocation(e.charAt(0).toUpperCase() + e.slice(1))
        }
      />
      <div className="text-md mt-4">
        {weatherData && (
          <div>
            {(weatherData.city == "" && weatherData.state == "" && (
              <div className="mt-2">
                {location}, {weatherData.country}
              </div>
            )) ||
              (weatherData.city == "" && (
                <div>
                  {weatherData.state}, {weatherData.country}
                </div>
              )) ||
              (weatherData.state == "" && (
                <div>
                  {weatherData.city}, {weatherData.country}
                </div>
              )) ||
              (weatherData.city != "" &&
                weatherData.state != "" &&
                weatherData.country != "" && (
                  <div>
                    {weatherData.city}, {weatherData.state},{" "}
                    {weatherData.country}
                  </div>
                ))}

            <div>{weatherData.current.date}</div>
            <div className="p-3 flex justify-center">
              <div>
                <div className="font-bold pt-4 text-3xl">
                  {Math.ceil(weatherData.current.temp)} °F
                </div>
                <div>
                  {weatherData.current.description
                    .split(" ")
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </div>
                <span className="text-xs">
                  Updated as of {weatherData.current.time}
                </span>
                <ul className="grid grid-cols-2 text-xs pt-3 pb-3">
                  <li className="p-2">
                    <span className="font-bold">UV:</span>{" "}
                    {weatherData.current.uvindex}
                  </li>
                  <li className="p-2">
                    <span className="font-bold">Feels Like:</span>{" "}
                    {Math.ceil(weatherData.current.feels_like)} °F
                  </li>
                  <li className="p-2">
                    <span className="font-bold">Humidity:</span>{" "}
                    {weatherData.current.humidity}%
                  </li>
                  <li className="p-2">
                    <span className="font-bold">Barometer:</span>{" "}
                    {weatherData.current.pressure} hPa
                  </li>
                </ul>
                <div>
                  Wind
                  {weatherData.current.wind_deg}{" "}
                  {weatherData.current.wind_speed} mph
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-3">Hourly Weather</div>
              <ul className="grid grid-cols-8">
                {weatherData.hourly.map((hourly, key) => {
                  return (
                    <li className="text-xs" key={key}>
                      <div className="font-bold mt-3">
                        {hourly.time > TIME_FORMAT
                          ? hourly.time - TIME_FORMAT
                          : hourly.time}
                        {hourly.time > TIME_FORMAT ? ":00 PM" : ":00 AM"}
                      </div>
                      <div className="flex justify-center p-1 ">
                        <span className="mr-2">
                          <span className="font-bold">Temp:</span>{" "}
                          {hourly.data.temp} °F
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span className="mr-2">
                          <span className="font-bold">Wind: </span>{" "}
                          {hourly.data.wind_speed} mph
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span>
                          <span>
                            {hourly.data.description
                              .split(" ")
                              .map(
                                (s) =>
                                  s.charAt(0).toUpperCase() + s.substring(1)
                              )
                              .join(" ")}
                          </span>{" "}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="font-bold mb-3">Daily Weather</div>
              <ul className="grid grid-cols-8">
                {weatherData.daily.map((daily, key) => {
                  return (
                    <li className="text-xs" key={key}>
                      <span className="font-bold">{daily.day}</span>
                      <div className="grid grid-cols-1">
                        <span className="pt-3">
                          <span className="font-bold text-2xl">
                            {" "}
                            {Math.ceil(daily.data.temp.max)} °F{" "}
                          </span>
                          <span className="text-xs">
                            {Math.ceil(daily.data.temp.min)} °F{" "}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;