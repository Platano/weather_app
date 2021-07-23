import os
from location import Location
from urllib.error import URLError
from dotenv import load_dotenv
import requests

load_dotenv()

API_KEY = os.environ["API_KEY"]
API_URL = os.environ["API_URL"]
API_KEY_OPEN_CAGE = os.environ["API_KEY_OPEN_CAGE"]
API_URL_OPEN_CAGE = os.environ["API_KEY_OPEN_CAGE"]


class Forecast:

    def __init__(self, location: str):

        self.loc_info = self._lat_and_lon(location)

        try:
            self.response = requests.get(
                f"{API_URL}onecall?lat={self.loc_info['lat']}&lon={self.loc_info['lon']}&appid={API_KEY}&units=imperial")
        except URLError as e:
            print(e.reason)

        self.data = self.response.json()
        self.results = self._results()

    def _lat_and_lon(self, location: str):

        loc = location

        if (type(location) == str):
            loc = location.replace(" ", "%20")

        try:
            response = requests.get(
                f"https://api.opencagedata.com/geocode/v1/json?q={loc}&key={API_KEY_OPEN_CAGE}")
        except URLError as e:
            print(e.reason)

        loc_info_response = response.json()
        
        try:
            city = loc_info_response['results'][0]['components']['city']
            state = loc_info_response['results'][0]['components']['state']
        except KeyError:
            state = ""
        except IndexError:
            city = "" 

        try:
            lat = float(loc_info_response['results'][0]['geometry']['lat'])
            lon = float(loc_info_response['results'][0]['geometry']['lng'])
        except IndexError:
            lat = ""
            lon = ""

        return {
            "lat": lat,
            "lon": lon,
            "city": city,
            "state": state,
            "country": loc_info_response['results'][0]['components']['country']
        }

    def _results(self):
        return Location(
            self.loc_info['lat'],
            self.loc_info['lon'],
            self.loc_info['city'],
            self.loc_info['state'],
            self.loc_info['country'],
            self.data['timezone_offset'],
            {
                "current": self.data['current'],
                "hourly": self.data['hourly'],
                "daily": self.data['daily'],
            },
        )
