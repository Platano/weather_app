import * as React from "react";

export const TIME_FORMAT = 12;
export const MAX_DEGREE = 360;
export const COMPASS_SECTORS = 22.5;
export const NOON = 12;
export const compassSector = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
  "N",
];

export const windArrowRotation : any = {
    'E' : 0,
    'ENE' : 30,
    'NE' :  45,
    'NNE' : 60,
    'N' : 90,
    'NNW' : 120,
    'NW' : 135,
    'WNW' : 150,
    'W' : 180,
    'WSW' : 210,
    'SW' : 225,
    'SSW' : 240,
    'S' : 270,
    'SSE' : 300,
    'SE' : 315,
    'ESE' : 330,
}

export function descriptionToUpper(description: string) {
  return description
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

export function getWindDirection(degree: number) {
  return parseInt(
    (Math.round(degree % MAX_DEGREE) / COMPASS_SECTORS + 1).toPrecision(1)
  );
}

export function getLocationHeading(location: string[]) {
  return (
    (location[0] == "" && location[1] == "" && (
      <div className="mt-2">
        {location[0]}, {location[2]}
      </div>
    )) ||
    (location[0] == "" && (
      <div className="mt-2">
        {location[1]}, {location[2]}
      </div>
    )) ||
    (location[1] == "" && (
      <div className="mt-2">
        {location[0]}, {location[2]}
      </div>
    )) ||
    (location[0] && location[1] && location[2] && (
      <div className="mt-2">
        {location[0]}, {location[1]}, {location[2]}
      </div>
    ))
  );
}

export function getTime(time: number) {
  if (time > TIME_FORMAT) return `${time - TIME_FORMAT}:00 PM`;
  else if (time == 0) return `${(time - TIME_FORMAT)* -1}:00 AM`;
  else if (time == NOON) return `${time}:00 PM`;
  else return `${time}:00 AM`;
}

export function getDailyDate(date: string) {
  const dailyDate = date.split("/");
  return `${dailyDate[0]}/${dailyDate[1]}`;
}

