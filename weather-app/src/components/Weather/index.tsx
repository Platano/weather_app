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

      <div className="text-sm">
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
                <span className="font-bold text-lg">
                  {weatherData.current.time}
                </span>
                <div className="font-bold">Current Weather</div>
                <ul className="grid grid-cols-6 text-md pt-5 pb-5">
                  <li className="p-3">
                    <span className="font-bold">Temperature:</span>{" "}
                    {weatherData.current.temp} °F
                  </li>
                  <li className="p-3">
                    <span className="font-bold">UV Index:</span>{" "}
                    {weatherData.current.uvindex}
                  </li>
                  <li className="p-3">
                    <span className="font-bold">Feels Like:</span>{" "}
                    {weatherData.current.feels_like} °F
                  </li>
                  <li className="p-3">
                    <span className="font-bold">Humidity:</span>{" "}
                    {weatherData.current.humidity}%
                  </li>
                  <li className="p-3">
                    <span className="font-bold">Pressure:</span>{" "}
                    {weatherData.current.pressure} hPa
                  </li>
                  <li className="p-3 font-bold">
                    {weatherData.current.description}
                  </li>
                </ul>
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
                        <span>
                          <span className="font-bold">Feels Like:</span>{" "}
                          {hourly.data.feels_like} °F
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span className="mr-2">
                          <span className="font-bold">Humidity:</span>{" "}
                          {hourly.data.humidity}%
                        </span>
                        <span>
                          <span className="font-bold">Dew Point:</span>{" "}
                          {hourly.data.dew_point} °F
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span className="mr-2">
                          <span className="font-bold">Wind Speed:</span>{" "}
                          {hourly.data.wind_speed} mph
                        </span>
                        <span>
                          <span className="font-bold">Clouds:</span>{" "}
                          {hourly.data.clouds}%
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span>
                          <span className="mr-2">
                            <span className="font-bold">Main: </span>{" "}
                            {hourly.data.main}
                          </span>{" "}
                        </span>
                        <span>
                          <span>
                            <span className="font-bold">Description:</span>{" "}
                            {hourly.data.description}
                          </span>{" "}
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span></span>
                        <span></span>
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
                      <span>
                        <div className="font-bold p-4">Temp</div>
                        <ul className="grid grid-cols-2">
                          <li key={key}>
                            <span className="font-bold">Min:</span>{" "}
                            {daily.data.temp.min} °F
                          </li>
                          <li key={key}>
                            <span className="font-bold">Max:</span>{" "}
                            {daily.data.temp.max} °F
                          </li>
                          <li key={key}>
                            <span className="font-bold">Morn:</span>{" "}
                            {daily.data.temp.morn} °F
                          </li>
                          <li key={key}>
                            <span className="font-bold">Day:</span>{" "}
                            {daily.data.temp.day} °F
                          </li>
                          <li key={key}>
                            <span className="font-bold">Eve:</span>{" "}
                            {daily.data.temp.eve} °F
                          </li>
                          <li key={key}>
                            <span className="font-bold">Night:</span>{" "}
                            {daily.data.temp.night} °F
                          </li>
                        </ul>
                      </span>
                      <div className="p-4">
                        <div className="font-bold pb-4">Feels Like</div>
                        <ul className="grid grid-cols-2">
                          <li key={key}>
                            <span className="font-bold">Morn: </span>
                            {daily.data.feels_like.morn}
                          </li>
                          <li key={key}>
                            <span className="font-bold">Day: </span>
                            {daily.data.feels_like.day}
                          </li>
                          <li key={key}>
                            <span className="font-bold">Eve: </span>
                            {daily.data.feels_like.day}
                          </li>
                          <li key={key}>
                            <span className="font-bold">Night: </span>
                            {daily.data.feels_like.night}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <span className="mr-2">
                          <span className="font-bold">Humidity: </span>{" "}
                          {daily.data.humidity}%
                        </span>
                        <span>
                          {" "}
                          <span className="font-bold">Dew Point: </span>{" "}
                          {daily.data.dew_point} °F
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