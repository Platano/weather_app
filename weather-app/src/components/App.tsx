import * as React from "react";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
  import "./../assets/css/tailwind.css";
import { Location } from '../types'
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import DailyWeather from "./DailyWeather";
import SearchBar from "./SearchBar";



export function App() : React.ReactElement
{
    const [location, setLocation] = useState<Location>();
    const [isLocation, setIsLocation] = useState<Boolean>(false);
    
    return (
      <div>
        <SearchBar onSearchClick={setLocation}/>
        <CurrentWeather />
        <HourlyWeather />
        <DailyWeather />
      </div>

    );


}