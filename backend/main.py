from flask import Flask
from flask_restx import Api
from flask_cors import CORS

app = Flask(__name__, static_url_path="/")

CORS(app)

api = Api(app, doc="/")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
