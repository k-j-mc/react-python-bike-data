import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client
import pandas as pd
import json
from bson import json_util

journeys = mongo_client.journeys
journey_collection = journeys.journey

stations = mongo_client.stations
station_collection = stations.station

journey_amount = journey_collection.count_documents({})
station_amount = station_collection.count_documents({})

load_dotenv(dotenv_path="./.env.local")

FIRST_JOURNEY_URL = "https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv"
SECOND_JOURNEY_URL = "https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv"
THIRD_JOURNEY_URL = "https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv"

STATION_URL = (
    "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv"
)

DEBUG = bool(os.environ.get("DEBUG", True))

app = Flask(__name__)

CORS(app)

app.config["DEBUG"] = DEBUG


def journey_process(URL):
    data = pd.read_csv(URL)
    filtered_distance = data[data["Covered distance (m)"] > 10]
    filtered_time = filtered_distance[filtered_distance["Duration (sec.)"] > 600]

    payload = json.loads(filtered_time.to_json(orient="records"))
    journey_collection.insert_many(payload)


def station_process(URL):
    data = pd.read_csv(URL)

    payload = json.loads(data.to_json(orient="records"))
    station_collection.insert_many(payload)


@app.route("/fetch-journeys", methods=["GET", "POST"])
def journey_data():
    if request.method == "GET":
        if journey_amount == 0:
            journey_process(FIRST_JOURNEY_URL)
            journey_process(SECOND_JOURNEY_URL)
            journey_process(THIRD_JOURNEY_URL)

            return {"total_journeys": journey_amount}

        else:
            return {"total_journeys": journey_amount}


@app.route("/fetch-stations", methods=["GET", "POST"])
def station_data():
    if request.method == "GET":
        if station_amount == 0:
            station_process(STATION_URL)

            return {"total_stations": station_amount}

        else:
            return {"total_stations": station_amount}


@app.route("/journeys", methods=["GET"])
def get_journeys():
    if request.method == "GET":
        journey = journey_collection.find({}).limit(25)

        return json.loads(json_util.dumps(journey))


@app.route("/stations", methods=["GET"])
def get_stations():
    if request.method == "GET":
        station = station_collection.find({}).limit(25)

        return json.loads(json_util.dumps(station))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
