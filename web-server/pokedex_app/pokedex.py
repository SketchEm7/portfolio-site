import sqlite3
from flask import jsonify

# connect to database
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite3.connect('pokedex.db', check_same_thread=False)
conn.row_factory = dict_factory
cur = conn.cursor()


def get_pokemon():
    cur.execute('select * from pokemon_table')
    rows = cur.fetchall()
    return jsonify([
        {
            'id': result['id'],
            'name': result['name'],
            'type_one': result['type_one'],
            'type_two': result['type_two'],
            'total': result['total'],
            'hp': result['hp'],
            'attack': result['attack'],
            'defense': result['defense'],
            'sp_attack': result['sp_attack'],
            'sp_defense': result['sp_defense'],
            'speed': result['speed'],
        }
        for result in rows
    ])

