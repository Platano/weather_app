import axios, { AxiosResponse } from "axios";
import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import SearchField from "react-search-field";
import "./../../assets/css/tailwind.css";
import {
  compassSector,
  descriptionToUpper,
  getDailyDate,
  getLocationHeading,
  getTime,
  getWindDirection,
  weatherIcon,
  windArrowRotation,
} from "../../utils";
import { WeatherData } from "../../types";

export function Weather() : React.ReactElement {
  const [location, setLocation] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [error, setError] = useState(null);
  const rainDrop = require("./../../assets/img/rain-drop.svg");
  const windDirection = require("./../../assets/img/right-arrow.svg");
  const initialRender = useRef(true);

  function weatherInfo<T>(loc: string): Promise<AxiosResponse<T>> {
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

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getWeatherData(location);
    }
  }, [location]);

  return (
    <div className="text-center">
      <SearchField
        placeholder="Enter City..."
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
            {getLocationHeading([
              weatherData.city,
              weatherData.state,
              weatherData.country,
            ])}
            <div>{weatherData.current.date}</div>
            <div className="p-3 flex justify-center">
              <div>
                <div className="ml-20">
                  {weatherIcon[`${weatherData.current.weather_icon}`]}
                </div>
                <div className="font-bold pt-4 text-3xl">
                  {Math.ceil(weatherData.current.temp)} °F
                </div>
                <div>{descriptionToUpper(weatherData.current.description)}</div>
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
                <div className="flex justify-center">
                  <img
                    src={windDirection.default}
                    className={`transform rotate-${
                      windArrowRotation[
                        `${
                          compassSector[
                            getWindDirection(weatherData.current.wind_deg)
                          ]
                        }`
                      ]
                    }`}
                    height="30"
                    width="30"
                  />               
                  <span className="ml-3">{Math.round(weatherData.current.wind_speed)} mph</span>
                </div>
              </div>
            </div>
            <div>
              <ul className="grid grid-cols-8">
                {weatherData.hourly.map((hourly, key) => {
                  return (
                    <li className="text-xs" key={key}>
                      <div className="flex justify-center">
                        {weatherIcon[`${hourly.data.weather_icon}`]}
                      </div>
                      <div className="font-bold justify-center mt-3">
                        {getTime(hourly.time)}
                      </div>
                      <div className="flex justify-center p-1 ">
                        <span className="mr-2">
                          {Math.round(hourly.data.temp)} °F
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        {
                          <img
                            src={windDirection.default}
                            className={`transform rotate-${
                              windArrowRotation[
                                `${
                                  compassSector[
                                    getWindDirection(hourly.data.wind_deg)
                                  ]
                                }`
                              ]
                            }`}
                            height="10"
                            width="10"
                          />
                        }
                        <span className="ml-3">{Math.round(hourly.data.wind_speed)} mph</span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span>
                          <span>
                            {descriptionToUpper(hourly.data.description)}
                          </span>{" "}
                          <span className="flex mt-2 justify-center">
                            <img
                              src={rainDrop.default}
                              className="mr-3"
                              width="12"
                              height="12"
                            />
                            <span className="pt-2">
                              {Math.round(hourly.data.pop * 100)}%
                            </span>
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <ul className="grid grid-cols-8 mt-10">
                {weatherData.daily.map((daily, key) => {
                  return (
                    <li className="text-xs" key={key}>
                      <span className="font-bold">
                        {daily.day.substring(0,3)} {getDailyDate(daily.date)}
                      </span>
                      <div className="grid grid-cols-1">
                        <span className="pt-3">
                          <span className="font-bold text-2xl">
                            {" "}
                            {Math.round(daily.data.temp.max)} °F{" "}
                          </span>
                          <span className="font-bold text-xs">
                            {Math.round(daily.data.temp.min)} °F{" "}
                          </span>
                        </span>
                      </div>
                      <div className="pt-3">{descriptionToUpper(daily.data.description)}</div>
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