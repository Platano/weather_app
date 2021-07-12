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
coordinates = { "lat" : float, "lon" : float}

class Forecast:
      
    def __init__(self, location : str):
        
        coordinates = self._lat_and_lon(location)

        try:
            self.response = requests.get(f"{API_URL}onecall?lat={coordinates['lat']}&lon={coordinates['lon']}&appid={API_KEY}&units=imperial")
        except URLError as e:
            print(e.reason)   

        self.data = self.response.json()
        self.results = self._results()

    def _lat_and_lon(self, location : str):
        
        loc = location
        
        if (type(location) == str):
            loc = location.replace(" ", "%20")    

        try:
            response = requests.get(f"https://api.opencagedata.com/geocode/v1/json?q={loc}&key={API_KEY_OPEN_CAGE}")
        except URLError as e:
            print(e.reason)

        parameters = response.json()
   
        coordinates = { "lat": float(parameters['results'][0]['geometry']['lat']), 
                        "lon": float(parameters['results'][0]['geometry']['lng'])}

        return coordinates
   
    def _results(self):
        results = Location( coordinates['lat'], 
                            coordinates['lon'], 
                            self.data['timezone_offset'],
                            {
                                "current" : self.data['current'], 
                                "hourly" : self.data['hourly'],
                                "daily" : self.data['daily'],
                            },
                          )
        return results        