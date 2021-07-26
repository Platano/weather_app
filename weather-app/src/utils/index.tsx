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

export const weatherIcon: { [icon: string]: JSX.Element } = {
  "01d": <img src={require("./../assets/img/01d.png").default} />,
  "01n": <img src={require("./../assets/img/01n.png").default} />,
  "02d": <img src={require("./../assets/img/02d.png").default} />,
  "02n": <img src={require("./../assets/img/02n.png").default} />,
  "03d": <img src={require("./../assets/img/03d.png").default} />,
  "03n": <img src={require("./../assets/img/03n.png").default} />,
  "04d": <img src={require("./../assets/img/04d.png").default} />,
  "04n": <img src={require("./../assets/img/04n.png").default} />,
  "09d": <img src={require("./../assets/img/09d.png").default} />,
  "09n": <img src={require("./../assets/img/09n.png").default} />,
  "10d": <img src={require("./../assets/img/10d.png").default} />,
  "10n": <img src={require("./../assets/img/10n.png").default} />,
  "11d": <img src={require("./../assets/img/11d.png").default} />,
  "11n": <img src={require("./../assets/img/11n.png").default} />,
  "13d": <img src={require("./../assets/img/13d.png").default} />,
  "13n": <img src={require("./../assets/img/13n.png").default} />,
  "50d": <img src={require("./../assets/img/50d.png").default} />,
  "50n": <img src={require("./../assets/img/50n.png").default} />,
};

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
      <div>
        {location[1]}, {location[2]}
      </div>
    )) ||
    (location[1] == "" && (
      <div>
        {location[0]}, {location[2]}
      </div>
    )) ||
    (location[0] && location[1] && location[2] && (
      <div>
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

