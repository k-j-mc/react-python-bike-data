import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client
import pandas as pd
import json

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


@app.route("/", methods=["GET"])
def get_csv_data():
    if request.method == "GET":
        if journey_collection.count_documents({}) == 0:
            data = pd.read_csv(FIRST_JOUREY_URL)

            filtered_distance = data[data["Covered distance (m)"] > 10]
            filtered_time = filtered_distance[
                filtered_distance["Duration (sec.)"] > 600
            ]

            payload = json.loads(filtered_time.to_json(orient="records"))
            journey_collection.insert_many(payload)

            return {"total_documents": journey_collection.count_documents({})}

        else:
            return {"total_documents": journey_collection.count_documents({})}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
