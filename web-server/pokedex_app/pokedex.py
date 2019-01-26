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
        'CREATE TABLE IF NOT EXISTS pokemon_table( id INT, name TEXT, type_one TEXT, type_two TEXT,total INT,  hp INT, attack INT, defense INT, sp_attack INT, sp_defense INT, speed INT)')


def insert_pokemon():
    values_to_insert = [
        (1,	"Bulbasaur","Grass", "Poison",318,45,49,49,65,65,45),
        (2, "Ivysaur", "Grass", "Poison",405,60,62,63,80,80,60),
        (3, "Venusaur", "Grass", "Poison",525,80,82,83,100,100,80),
        (4, "Charmander", "Fire", null, 309,39,52,43,60,50,65),
        (5, "Charmeleon", "Fire", null, 405,58,64,58,80,65,80),
        (6, "Charizard", "Fire", "Flying", 534,78,84,78,109,85,100),
        (7, "Squirtle", "Water", null, 314,44,48,65,50,64,43),
        (8, "Wartortle", "Water", null, 405,59,63,80,65,80,58),
        (9, "Blastoise", "Water", null, 530,79,83,100,85,105,78),
        (10, "Caterpie", "Bug", null, 195,45,30,35,20,20,45),
        (11, "Metapod", "Bug", null, 205,50,20,55,25,25,30),
        (12, "Butterfree", "Bug", "Flying", 395,60,45,50,90,80,70),
        (13," Weedle", "Bug", "Poison", 195,40,35,30,20,20,50),
        (14, "Kakuna", "Bug", "Poison", 205,45,25,50,25,25,35),
        (15, "Beedrill", "Bug", "Poison", 395,65,90,40,45,80,75),
        (16, "Pidgey", "Normal", "Flying", 251,40,45,40,35,35,56),
        (17, "Pidgeotto", "Normal", "Flying", 349,63,60,55,50,50,71),
        (18, "Pidgeot", "Normal", "Flying", 479,83,80,75,70,70,101),
        (19, "Rattata", "Normal", null, 253,30,56,35,25,35,72),
        (20, "Raticate", "Normal", null, 413,55,81,60,50,70,97),
        (21, "Spearow", "Normal", "Flying", 262,40,60,30,31,31,70),
        (22, "Fearow", "Normal", "Flying", 442,65,90,65,61,61,100),
        (23, "Ekans", "Poison", null, 288,35,60,44,40,54,55),
        (24, "Arbok", "Poison", null, 438,60,85,69,65,79,80),
        (25, "Pikachu", "Electric", null, 320,35,55,40,50,50,90),
        (26, "Raichu", "Electric", null, 485,60,90,55,90,80,110),
        (27, "Sandshrew", "Ground", null, 300,50,75,85,20,30,40),
        (28, "Sandslash", "Ground", null, 450,75,100,110,45,55,65),
    ]
    cur.executemany("""
        INSERT INTO pokemon_table (id, name, type_one, type_two,total, hp, attack, defense, sp_attack, sp_defense, speed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", values_to_insert)


create_table()
insert_pokemon()