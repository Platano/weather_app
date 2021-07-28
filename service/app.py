from logging import debug
from .search import Search
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# Search for weather in location

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/weather/{location}")
def get_weather(location: str):
    # Search attempt
    try:
        search = Search(location)
        return search._get_results()
    except UnboundLocalError:
        print(
            "Please enter a zip code, country code, city name, or state")

def get_boolean_env(key: str):
    return os.getenv(key, "False").lower() in ("true", "1", "t")

if __name__ == "__main__":
    debug = get_boolean_env("DEBUG")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=debug)
