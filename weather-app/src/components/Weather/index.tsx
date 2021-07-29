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
  windArrowRotation,
  settings,
} from "../../utils";
import { WeatherData } from "../../types";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export function Weather() : React.ReactElement {
  const [location, setLocation] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [error, setError] = useState(null);
  const rainDrop = require("./../../assets/img/rain-drop.svg");
  const windDirection = require("./../../assets/img/right-arrow.svg");
  const initialRender = useRef(true);

  function weatherInfo<T>(loc: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(`https://weather-jeff.herokuapp.com/weather/${loc}`, {
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
        return<div>Error: {error.message}</div>;
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
      <div>
        <SearchField
          placeholder="Enter City..."
          classNames="fhd:w-3/12 qhd:w-3/12 uhd:w-3/12"
          onSearchClick={(e: string) =>
            setLocation(e.charAt(0).toUpperCase() + e.slice(1))
          }
          onEnter={(e: string) =>
            setLocation(e.charAt(0).toUpperCase() + e.slice(1))
          }
        />
      </div>
      <div className="mt-4">
        {weatherData && (
          <div className="qhd:text-2xl uhd:text-3xl">
            {getLocationHeading([
              weatherData.city,
              weatherData.state,
              weatherData.country,
            ])}
            <div>{weatherData.current.date}</div>
            <div className="uhd:text-2xl uhd:p-3 fhd:flex qhd:flex uhd:flex justify-evenly">
              <div>
                <div className="flex justify-center">
                  <img
                    src={
                      require(`./../../assets/img/${weatherData.current.weather_icon}.svg`)
                        .default
                    }
                    height="30%"
                    width="30%"
                  />
                </div>
                <div className="font-bold uhd:pt-4 qhd:text-3xl uhd:5xl">
                  {Math.ceil(weatherData.current.temp)} °F
                </div>
                <div>{descriptionToUpper(weatherData.current.description)}</div>
                <span className="text-xs uhd:text-3xl">
                  Updated as of {weatherData.current.time}
                </span>
                <ul className="grid grid-cols-2 fhd:text-xs uhd:text-3xl uhd:pt-3">
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
                    height="10%"
                    width="10%"
                  />
                  <span className="uhd:text-4xl p-3">
                    {Math.round(weatherData.current.wind_speed)} mph
                  </span>
                </div>
              </div>
              <div className="flex grid grid-cols-1 mt-20 mr-10">
                <div className="flex grid grid-cols-1">
                  <div className="flex grid grid-cols-1">
                    <img
                      src={require(`./../../assets/img/sunrise-1.gif`).default}
                      height="30%"
                      width="30%"
                      className="xs:ml-36"
                    />
                    <div className="ml-4 fhd:mr-56 qhd:mr-56 uhd:mr-56">
                      {weatherData.current.sunrise.substring(1)}
                    </div>
                  </div>
                  <div className="flex grid grid-cols-1">
                    <img
                      src={require(`./../../assets/img/sunset-1.gif`).default}
                      height="30%"
                      width="30%"
                      className="xs:ml-36"
                    />
                    <div className="ml-4 fhd:mr-56 qhd:mr-56 uhd:mr-56">
                      {weatherData.current.sunset.substring(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul className="xs:hidden mt-32">
                <Slider {...settings}>
                  {weatherData.hourly.map((hourly, key) => {
                    return (
                      <li
                        className="fhd:text-xs qhd:text-md uhd:text-3xl"
                        key={key}
                      >
                        <div className="flex justify-center">
                          <img
                            src={
                              require(`./../../assets/img/${hourly.data.weather_icon}.svg`)
                                .default
                            }
                            height="25%"
                            width="25%"
                          />
                        </div>
                        <div className="font-bold justify-center uhd:mt-3">
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
                              height="5%"
                              width="5%"
                            />
                          }
                          <span className="ml-3">
                            {Math.round(hourly.data.wind_speed)} mph
                          </span>
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
                                width="5%"
                                height="5%"
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
                </Slider>
              </ul>
              <ul className=" fhd:hidden qhd:hidden uhd:hidden flex grid grid-cols-4">
                {weatherData.hourly.map((hourly, key) => {
                  return (
                    <li
                      className="text-xs qhd:text-md uhd:text-3xl"
                      key={key}
                    >
                      <div className="flex justify-center">
                        <img
                          src={
                            require(`./../../assets/img/${hourly.data.weather_icon}.svg`)
                              .default
                          }
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className="font-bold justify-center uhd:mt-3">
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
                            height="10%"
                            width="10%"
                          />
                        }
                        <span className="ml-3">
                          {Math.round(hourly.data.wind_speed)} mph
                        </span>
                      </div>
                      <div className="flex justify-center p-1">
                        <span>
                          <span className="xs:text-xxs">
                            {descriptionToUpper(hourly.data.description)}
                          </span>{" "}
                          <span className="flex mt-2 justify-center">
                            <img
                              src={rainDrop.default}
                              className="mr-3"
                              width="10%"
                              height="10%"
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
            <div className="fhd:mt-32 qhd:mt-40 uhd:mt-52">
              <ul className="grid grid-cols-8 qhd:mt-5 uhd:mt-32">
                {weatherData.daily.map((daily, key) => {
                  return (
                    <li
                      className="fhd:text-xs qhd:text-2xl uhd:text-3xl"
                      key={key}
                    >
                      <span className="font-bold xs:text-xs">
                        {daily.day.substring(0, 3)} {getDailyDate(daily.date)}
                      </span>
                      <div className="flex justify-center">
                        <img
                          src={
                            require(`./../../assets/img/${daily.data.weather_icon}.svg`)
                              .default
                          }
                          className=""
                          height="100%"
                          width="100%"
                        />
                      </div>
                      <div className="grid grid-cols-1">
                        <span className="pt-3">
                          <span className="font-bold xs:text-sm text-2xl uhd:text-6xl">
                            {" "}
                            {Math.round(daily.data.temp.max)} °F{" "}
                          </span>
                          <span className="font-bold text-xs uhd:text-3xl">
                            {Math.round(daily.data.temp.min)} °F{" "}
                          </span>
                        </span>
                      </div>
                      <div className="pt-3 xs:text-xs">
                        {descriptionToUpper(daily.data.description)}
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