import sqlite3

# connect to database
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite3.connect('pokedex.db')
conn.row_factory = dict_factory
cur = conn.cursor()

def create_table():
    cur.execute(
        'CREATE TABLE IF NOT EXISTS pokemon_table( id PRIMARY KEY, name TEXT, type_one TEXT, type_two TEXT, hp INT, attack INT, defense INT, sp_attack INT, sp_defense INT, speed INT)')

def insert_pokemon():
    values_to_insert = [
        (1,"foo"),
        (2, "bar"),
        (3, "baz"),
    ]

    cursor.executemany("""
        INSERT INTO pokemon_table (id, name, type_one, type_two, hp, attack, defense, sp_attack, sp_defense, speed)
        VALUES (?, ?)""", values_to_insert)
