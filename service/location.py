from datetime import datetime
from typing import Dict

HOURS_IN_A_DAY = 24
DAYS_IN_A_WEEK = 7

Weekday = {
    '0': "Sunday",
    '1': "Monday",
    '2': "Tuesday",
    '3': "Wednesday",
    '4': "Thursday",
    '5': "Friday",
    '6': "Saturday",
}


class Location:

    #Create location object with latitude, longitude, and weather
    def __init__(self, lat: float, lon: float,  city: str, state: str, country: str, timezone_offset: int, weather: Dict):
        self.lat = lat
        self.lon = lon
        self.city = city
        self.state = state
        self.country = country
        self.timezone_offset = timezone_offset
        self.weather = weather

    #TODO: Add more data to display in front end

    def _get_current_weather(self):
        return {
            'date': datetime.utcfromtimestamp(self.weather['current']['dt']).strftime('%D'),
            'time': datetime.utcfromtimestamp(self.weather['current']['dt'] + self.timezone_offset).strftime('%I:%M %p'),
            'sunrise' : datetime.utcfromtimestamp(self.weather['current']['sunrise'] + self.timezone_offset).strftime('%I:%M %p'),
            'sunset' : datetime.utcfromtimestamp(self.weather['current']['sunset'] + self.timezone_offset).strftime('%I:%M %p'),
            'temp': self.weather['current']['temp'],
            'feels_like': self.weather['current']['feels_like'],
            'uvindex': self.weather['current']['uvi'],
            'humidity': self.weather['current']['humidity'],
            'dew_point': self.weather['current']['dew_point'],
            'pressure': self.weather['current']['pressure'],
            'description': self.weather['current']['weather'][0]['description'],
            'weather_icon': self.weather['current']['weather'][0]['icon'],
            'wind_speed': self.weather['current']['wind_speed'],
            'wind_deg' : self.weather['current']['wind_deg'],
        }

    def _get_hourly_weather(self):
        index = 0
        hourly = []
        time = int(datetime.utcfromtimestamp(
            self.weather['hourly'][0]['dt'] + self.timezone_offset).strftime('%H'))
        
        
        while (index < HOURS_IN_A_DAY):

            try:
                wind_speed = self.weather['hourly'][index]['wind_speed']                    
            except KeyError:
                wind_speed = 0

            try:
                wind_deg = self.weather['hourly'][index]['wind_deg']
            except KeyError:
                wind_deg = ""

            hourly.append(
                {
                    "time" : time,
                    "data" : {
                        'temp': self.weather['hourly'][index]['temp'],
                        'main': self.weather['hourly'][index]['weather'][0]['main'],
                        'pop' : self.weather['hourly'][index]['pop'],
                        'description': self.weather['hourly'][index]['weather'][0]['description'],
                        'weather_icon': self.weather['hourly'][index]['weather'][0]['icon'],
                        'wind_speed' : wind_speed,
                        'wind_deg' : wind_deg
                    }
                }
            )

            if (time < HOURS_IN_A_DAY - 1):
                time = time + 1
            else:
                time = 0
            index = index + 1

        return hourly

    def _get_daily_weather(self):
        index = 0
        daily = []
        day = int(datetime.today().strftime("%w"))

        while (index <= DAYS_IN_A_WEEK):
            daily.append(
                {
                    "day" : Weekday[str(day)],
                    "date" : datetime.utcfromtimestamp(self.weather['daily'][index]['dt']).strftime('%D'),
                    "data" : {
                        'temp': {
                            'min': self.weather['daily'][index]['temp']['min'],
                            'max': self.weather['daily'][index]['temp']['max'],
                        },
                        'pressure': self.weather['daily'][index]['pressure'],
                        'main': self.weather['daily'][index]['weather'][0]['main'],
                        'description': self.weather['daily'][index]['weather'][0]['description'],
                        'weather_icon': self.weather['daily'][index]['weather'][0]['icon'],
                    }
                }
            )

            if (day < DAYS_IN_A_WEEK - 1):
                day = day + 1
            else:
                day = 0
            index = index + 1

        return daily
