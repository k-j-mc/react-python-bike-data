import os, re
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


@app.route("/fetch-journeys", methods=["GET"])
def journey_data():
    if request.method == "GET":
        if journey_amount == 0:
            journey_process(FIRST_JOURNEY_URL)
            journey_process(SECOND_JOURNEY_URL)
            journey_process(THIRD_JOURNEY_URL)

            return {"total_journeys": journey_amount}

        else:
            return {"total_journeys": journey_amount}


@app.route("/fetch-stations", methods=["GET"])
def station_data():
    if request.method == "GET":
        if station_amount == 0:
            station_process(STATION_URL)

            return {"total_stations": station_amount}

        else:
            return {"total_stations": station_amount}


@app.route("/journeys", methods=["GET"])
def get_journeys():
    limit = request.args.get("limit", default=10, type=int)
    skip = request.args.get("skip", default=0, type=int)
    station_name = request.args.get("station_name", type=str)

    if request.method == "GET":
        journey = journey_collection.find({}).skip(skip).limit(limit)

        if station_name == "":
            journey_total = journey_collection.count_documents({})

            payload = {
                "data": journey,
                "total": journey_total,
            }

            return json.loads(json_util.dumps(payload))

        else:
            journey = (
                journey_collection.find(
                    {"Return station name": re.compile(station_name, re.IGNORECASE)}
                )
                .skip(skip)
                .limit(limit)
            )
            journey_total = journey_collection.count_documents(
                {"Return station name": re.compile(station_name, re.IGNORECASE)}
            )

            payload = {
                "data": journey,
                "total": journey_total,
            }
            return json.loads(json_util.dumps(payload))
        #


@app.route("/stations", methods=["GET"])
def get_stations():
    limit = request.args.get("limit", default=10, type=int)
    skip = request.args.get("skip", default=0, type=int)
    station_id = request.args.get("station_id", type=int)
    station_name = request.args.get("station_name", type=str)

    if request.method == "GET":
        if station_name == "":
            station = station_collection.find({}).skip(skip).limit(limit)
            station_total = station_collection.count_documents({})

            payload = {"data": station, "total": station_total}

            return json.loads(json_util.dumps(payload))

        else:
            station = (
                station_collection.find(
                    {"Nimi": re.compile(station_name, re.IGNORECASE)}
                )
                .skip(skip)
                .limit(limit)
            )
            station_total = station_collection.count_documents(
                {"Nimi": re.compile(station_name, re.IGNORECASE)}
            )

            payload = {"data": station, "total": station_total}
            return json.loads(json_util.dumps(payload))


@app.route("/coords", methods=["GET"])
def get_coords():
    station_depart = request.args.get("station_depart", default=501, type=int)
    station_return = request.args.get("station_return", default=501, type=int)

    station_1 = station_collection.find({"ID": station_depart})
    station_2 = station_collection.find({"ID": station_return})

    payload = {
        "station_depart": station_1,
        "station_return": station_2,
    }

    return json.loads(json_util.dumps(payload))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
