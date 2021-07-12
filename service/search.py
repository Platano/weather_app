from forecast import Forecast

class Search:

    #Create a search object and create a forecast object based on location
    def __init__(self, location : str):
        self.forecast = Forecast(location)
        self.results = self.forecast.results

    #Get search results
    def _get_results(self):
        return { 
            "current" : self.results._get_current_weather(),
            "hourly" : self.results._get_hourly_weather(),
            "daily" : self.results._get_daily_weather()
        }

    