import * as React from "react";
import { COMPASS_SECTORS, MAX_DEGREE, TIME_FORMAT } from "../types";



export function descriptionToUpper (description : string){
    return description
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
}

export function getWindDirection(degree: string) {
  return parseInt(
    (Math.round(parseInt(degree) % MAX_DEGREE) / COMPASS_SECTORS + 1).toPrecision(1)
  );
}

export function getLocationHeading( location : string[]){

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
          {location[1]}, {location[2]}
        </div>
      )) ||
      (location[0] && location[1] && location[2] && (
        <div>
          {location[0]}, {location[1]}, {location[2]}
        </div>
      ))
    );  
 }

export function getTime(time : number){
    if (time > TIME_FORMAT)
        return time - TIME_FORMAT
    else if (time == 0)
        return (time - TIME_FORMAT) * (-1)
    else 
        return time
}