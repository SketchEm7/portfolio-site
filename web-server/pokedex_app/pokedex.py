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


def row_to_object(row):
    return {
        'id': row['id'],
        'name': row['name'],
        'type_one': row['type_one'],
        'type_two': row['type_two'],
        'total': row['total'],
        'hp': row['hp'],
        'attack': row['attack'],
        'defense': row['defense'],
        'sp_attack': row['sp_attack'],
        'sp_defense': row['sp_defense'],
        'speed': row['speed'],
    }


def get_pokemon():
    cur.execute('select * from pokemon_table')
    rows = cur.fetchall()
    return jsonify([
        row_to_object(result)
        for result in rows
    ])


def get_pokemon_by_name(pokemon_name: str):
    cur.execute("select * from pokemon_table WHERE lower(name) = lower(?)", [pokemon_name])
    row = cur.fetchone()
    return jsonify(row_to_object(row))

# TODO: handle nidorans have weird char and same name