from flask import Flask, Response, send_from_directory, render_template
import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route('/games')
def games():
    api_key = os.getenv('STEAM_API_KEY')
    sid = 76561198085130667
    route = f'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={api_key}&include_appinfo=1&steamid={sid}&include_played_free_games=1&format=json'
    data = requests.get(route).json()['response']
    resp = Response(response=json.dumps(data),
                    status=200,
                    mimetype='application/json')

    return resp


if __name__ == '_main_':
    app.run(debug=True, host='0.0.0.0')
