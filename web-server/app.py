from flask import Flask, Response, render_template, request, jsonify
import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

from to_draw_app.item_manager import todraw
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "todrawdatabase.db"))

app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

class List(db.Model):
    title = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)

    def __repr__(self):
        return "<Title: {}>".format(self.title)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route('/games')
def games():
    sid = request.args.get('steam_id', 76561198085130667)
    print(sid)
    api_key = os.getenv('STEAM_API_KEY')
    route_name = f'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={api_key}&format=json&steamids={sid}'
    route_games = f'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={api_key}&include_appinfo=1&steamid={sid}&include_played_free_games=1&format=json'

    data_name = requests.get(route_name).json()['response']
    data_games = requests.get(route_games).json()['response']

    result = data_games
    result['name'] = data_name['players'][0]['personaname']

    resp = Response(response=json.dumps(result),
                    status=200,
                    mimetype='application/json')

    return resp


@app.route('/testsql')
def sql_database():
    from test_sqlStuff.sqlquery import create_table
    from test_sqlStuff.sqlquery import dynamic_data_entry
    create_table()
    return dynamic_data_entry()


app.register_blueprint(todraw, url_prefix="/todraw")

if __name__ == '_main_':
    app.run(debug=True, host='0.0.0.0')
