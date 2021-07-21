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
            'time': datetime.utcfromtimestamp(self.weather['current']['dt'] + self.timezone_offset).strftime('%T'),
            'temp': self.weather['current']['temp'],
            'feels_like': self.weather['current']['feels_like'],
            'uvindex': self.weather['current']['uvi'],
            'humidity': self.weather['current']['humidity'],
            'dew_point': self.weather['current']['dew_point'],
            'pressure': self.weather['current']['pressure'],
            'main': self.weather['current']['weather'][0]['main'],
            'description': self.weather['current']['weather'][0]['description'],
            'wind_speed': self.weather['current']['wind_speed'],
            'clouds': self.weather['current']['clouds'],
        }

    def _get_hourly_weather(self):
        index = 0
        hourly = []
        time = int(datetime.utcfromtimestamp(
            self.weather['hourly'][0]['dt'] + self.timezone_offset).strftime('%H'))
        while (index < HOURS_IN_A_DAY):
            hourly.append(
                {
                    "time" : time,
                    "data" : {
                        'temp': self.weather['hourly'][index]['temp'],
                        'feels_like': self.weather['hourly'][index]['feels_like'],
                        'uvindex': self.weather['hourly'][index]['uvi'],
                        'humidity': self.weather['hourly'][index]['humidity'],
                        'dew_point': self.weather['hourly'][index]['dew_point'],
                        'pressure': self.weather['hourly'][index]['pressure'],
                        'main': self.weather['hourly'][index]['weather'][0]['main'],
                        'description': self.weather['hourly'][index]['weather'][0]['description'],
                        'wind_speed': self.weather['hourly'][index]['wind_speed'],
                        'clouds': self.weather['hourly'][index]['clouds'],
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
                    "data" : {
                        'temp': {
                            'day': self.weather['daily'][index]['temp']['day'],
                            'min': self.weather['daily'][index]['temp']['min'],
                            'max': self.weather['daily'][index]['temp']['max'],
                            'night': self.weather['daily'][index]['temp']['night'],
                            'eve': self.weather['daily'][index]['temp']['eve'],
                            'morn': self.weather['daily'][index]['temp']['morn'],
                        },
                        'feels_like': {
                            'day': self.weather['daily'][index]['feels_like']['day'],
                            'night': self.weather['daily'][index]['temp']['night'],
                            'eve': self.weather['daily'][index]['temp']['eve'],
                            'morn': self.weather['daily'][index]['temp']['morn'],
                        },
                        'uvindex': self.weather['daily'][index]['uvi'],
                        'humidity': self.weather['daily'][index]['humidity'],
                        'dew_point': self.weather['daily'][index]['dew_point'],
                        'pressure': self.weather['daily'][index]['pressure'],
                        'main': self.weather['daily'][index]['weather'][0]['main'],
                        'description': self.weather['daily'][index]['weather'][0]['description'],
                        'wind_speed': self.weather['daily'][index]['wind_speed'],
                    }
                }
            )

            if (day < DAYS_IN_A_WEEK - 1):
                day = day + 1
            else:
                day = 0
            index = index + 1

        return daily
