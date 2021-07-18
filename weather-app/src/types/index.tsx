export interface Date{
    day : string;
    month : string;
    year : string;
}

export interface Weather {
    date : Date;
    temp : number;
    feels_like : number;
    uvindex : number;
    humidity : number;
    dew_point : number;
    pressure : number;
    main : string;
    description : string;
    wind_speed : string;
    clouds : string;
}

export interface Location{
    lat : number;
    lon : number;
    city : string;
    state : string;
    country : string;
    timezone_offset : number;
    weather : Weather[];
}

export interface Forecast{
    data : string;
    location : Location;
}