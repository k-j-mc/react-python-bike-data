import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

journeys = mongo_client.journeys
journey_collection = journeys.journey

load_dotenv(dotenv_path="./.env.local")

FIRST_JOUREY_URL = "https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv"
SECOND_JOUREY_URL = "https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv"
THIRD_JOUREY_URL = "https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv"

STATION_URL = (
    "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv"
)

DEBUG = bool(os.environ.get("DEBUG", True))

app = Flask(__name__)

CORS(app)

app.config["DEBUG"] = DEBUG


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
