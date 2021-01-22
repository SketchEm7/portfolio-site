from flask import Flask, Response, render_template, request, send_from_directory
import requests
import json
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

from to_draw_app.item_manager import todraw
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "todrawdatabase.db"))

app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

df = pd.read_csv('./games.csv')
stompGames = df[ abs( df['white_rating'] - df['black_rating'] ) >= 1000 ]
checkmates = stompGames.where(stompGames['victory_status'] == 'mate')


class List(db.Model):
    title = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)

    def __repr__(self):
        return "<Title: {}>".format(self.title)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")


@app.route('/api/games')
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
    result['avatarmedium'] = data_name['players'][0]['avatarmedium']

    resp = Response(response=json.dumps(result),
                    status=200,
                    mimetype='application/json')

    return resp


@app.route('/api/game-news/<app_id>')
def game_news(app_id):
    route_news = f'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid={app_id}&count=3&maxlength=300&format=json'
    data_news = requests.get(route_news).json()
    result = data_news
    result['title'] = data_news['appnews']['newsitems'][0]['title']
    result['link'] = data_news['appnews']['newsitems'][0]['url']

    resp = Response(response=json.dumps(result),
                    status=200,
                    mimetype='application/json')
    return resp


@app.route('/api/game-extras/<name>', methods=['GET'])
def game_info(name):
    game_req = requests.post('https://api-v3.igdb.com/games',
                             headers={
                                 'Accept': 'application/json',
                                 'user-key': os.getenv('IGDB_KEY')
                             },
                             data=f'fields cover, summary; search \"{name}\";')
    game = game_req.json()[0]

    cover_req = requests.post('https://api-v3.igdb.com/covers',
                              headers={
                                  'Accept': 'application/json',
                                  'user-key': os.getenv('IGDB_KEY')
                              },
                              data=f'fields image_id; where id={game["cover"]};')
    cover_id = cover_req.json()[0]['image_id']

    review_req = requests.post('https://api-v3.igdb.com/feeds',
                               headers={
                                  'Accept': 'application/json',
                                  'user-key': os.getenv('IGDB_KEY')
                              },
                               data=f'fields content, published_at, updated_at; where games={game["id"]};')
    review = review_req.json()

    resp_text = json.dumps({
        'summary': game['summary'],
        'cover': f"https://images.igdb.com/igdb/image/upload/t_logo_med/{cover_id}.jpg",
        'review': review,
    })
    resp = Response(response=resp_text,
                    status=200,
                    mimetype='application/json')

    return resp


@app.route('/api/instafeed')
def instafeed():
    insta_token = os.getenv('INSTA_TOKEN')
    route_instafeed = f'https://api.instagram.com/v1/users/self/media/recent/?access_token={insta_token}'

    data_instafeed = requests.get(route_instafeed).json()['data']
    resp = Response(response=json.dumps(data_instafeed),
                    status=200,
                    mimetype='application/json')

    return resp


@app.route('/api/testsql')
def sql_database():
    from test_sqlStuff.sqlquery import create_table
    from test_sqlStuff.sqlquery import dynamic_data_entry
    create_table()
    return dynamic_data_entry()


@app.route('/api/pokedex/<name>')
def pokedex_name_lookup(name):
    from pokedex_app.pokedex import get_pokemon_by_name
    return get_pokemon_by_name(name)


@app.route('/api/pokedex')
def pokedex_db():
    from pokedex_app.pokedex import get_pokemon
    return get_pokemon()


@app.route('/pokemon/<path>')
def pokemon_image(path):
    return send_from_directory("../frontend/build/pokemon", path)


@app.route('/chess-pieces/<path>')
def chess_pieces_image(path):
    return send_from_directory("../frontend/build/chess-pieces", path)


@app.route('/api/chess/quick_mismatch')
def getQuickestStomp():
    firstQuickestStomp = checkmates.loc[checkmates['id'] == checkmates.iloc[checkmates['turns'].argmin()]['id']]
    return Response(response=firstQuickestStomp.to_json(orient="records"),
                    status=200,
                    mimetype='application/json')


@app.route('/api/chess/long_mismatch')
def getLongestStomp():
    firstLongestStomp = checkmates.loc[checkmates['id'] == checkmates.iloc[checkmates['turns'].argmax()]['id']]
    return Response(response=firstLongestStomp.to_json(orient="records"),
                    status=200,
                    mimetype='application/json')

app.register_blueprint(todraw, url_prefix="/todraw")

if __name__ == '_main_':
    app.run(debug=True, host='0.0.0.0')
