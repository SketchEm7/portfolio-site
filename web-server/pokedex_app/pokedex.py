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


def create_table():
    cur.execute(
        'CREATE TABLE IF NOT EXISTS pokemon_table( id INT, name TEXT, type_one TEXT, type_two TEXT,total INT,  hp INT, attack INT, defense INT, sp_attack INT, sp_defense INT, speed INT)')


def insert_pokemon():
    values_to_insert = [
        (1,	"Bulbasaur","Grass", "Poison",318,45,49,49,65,65,45),
        (2, "Ivysaur", "Grass", "Poison",405,60,62,63,80,80,60),
        (3, "Venusaur", "Grass", "Poison",525,80,82,83,100,100,80),
        (4, "Charmander", "Fire", None, 309,39,52,43,60,50,65),
        (5, "Charmeleon", "Fire", None, 405,58,64,58,80,65,80),
        (6, "Charizard", "Fire", "Flying", 534,78,84,78,109,85,100),
        (7, "Squirtle", "Water", None, 314,44,48,65,50,64,43),
        (8, "Wartortle", "Water", None, 405,59,63,80,65,80,58),
        (9, "Blastoise", "Water", None, 530,79,83,100,85,105,78),
        (10, "Caterpie", "Bug", None, 195,45,30,35,20,20,45),
        (11, "Metapod", "Bug", None, 205,50,20,55,25,25,30),
        (12, "Butterfree", "Bug", "Flying", 395,60,45,50,90,80,70),
        (13," Weedle", "Bug", "Poison", 195,40,35,30,20,20,50),
        (14, "Kakuna", "Bug", "Poison", 205,45,25,50,25,25,35),
        (15, "Beedrill", "Bug", "Poison", 395,65,90,40,45,80,75),
        (16, "Pidgey", "Normal", "Flying", 251,40,45,40,35,35,56),
        (17, "Pidgeotto", "Normal", "Flying", 349,63,60,55,50,50,71),
        (18, "Pidgeot", "Normal", "Flying", 479,83,80,75,70,70,101),
        (19, "Rattata", "Normal", None, 253,30,56,35,25,35,72),
        (20, "Raticate", "Normal", None, 413,55,81,60,50,70,97),
        (21, "Spearow", "Normal", "Flying", 262,40,60,30,31,31,70),
        (22, "Fearow", "Normal", "Flying", 442,65,90,65,61,61,100),
        (23, "Ekans", "Poison", None, 288,35,60,44,40,54,55),
        (24, "Arbok", "Poison", None, 438,60,85,69,65,79,80),
        (25, "Pikachu", "Electric", None, 320,35,55,40,50,50,90),
        (26, "Raichu", "Electric", None, 485,60,90,55,90,80,110),
        (27, "Sandshrew", "Ground", None, 300,50,75,85,20,30,40),
        (28, "Sandslash", "Ground", None, 450,75,100,110,45,55,65),
        (29, "Nidoran♀", "Poison", None, 275,55,47,52,40,40,41),
        (30, "Nidorina", "Poison", None, 365,70,62,67,55,55,56),
        (31, "Nidoqueen", "Poison", "Ground", 505,90,92,87,75,85,76),
        (32, "Nidoran♂", "Poison", None, 273,46,57,40,40,40,50),
        (33, "Nidorino", "Poison", None, 365,61,72,57,55,55,65),
        (34, "Nidoking", "Poison", "Ground", 505,81,102,77,85,75,85),
        (35, "Clefairy", "Fairy", None, 323,70,45,48,60,65,35),
        (36, "Clefable", "Fairy", None, 483,95,70,73,95,90,60),
        (37, "Vulpix", "Fire", None, 299,38,41,40,50,65,65),
        (38, "Ninetales", "Fire", None, 505,73,76,75,81,100,100),
        (39, "Jigglypuff", "Normal", "Fairy", 270,115,45,20,45,25,20),
        (40, "Wigglytuff", "Normal", "Fairy",435,140,70,45,85,50,45),
        (41, "Zubat", "Poison", "Flying", 245,40,45,35,30,40,55),
        (42, "Golbat", "Poison", "Flying", 455,75,80,70,65,75,90),
        (43, "Oddish", "Grass", "Poison", 320,45,50,55,75,65,30),
        (44, "Gloom", "Grass", "Poison", 395,60,65,70,85,75,40),
        (45, "Vileplume", "Grass", "Poison", 490,75,80,85,110,90,50),
        (46, "Paras", "Bug", "Grass", 285,35,70,55,45,55,25),
        (47, "Parasect", "Bug", "Grass", 405,60,95,80,60,80,30),
        (48, "Venonat", "Bug", "Poison", 305,60,55,50,40,55,45),
        (49, "Venomoth", "Bug", "Poison", 450,70,65,60,90,75,90),
        (50, "Diglett", "Ground", None, 265,10,55,25,35,45,95),
        (51, "Dugtrio", "Ground", None, 405,35,80,50,50,70,120),
        (52, "Meowth", "Normal", None, 290,40,45,35,40,40,90),
        (53, "Persian", "Normal", None, 440,65,70,60,65,65,115),
        (54, "Psyduck", "Water", None, 320,50,52,48,65,50,55),
        (55, "Golduck", "Water", None, 500,80,82,78,95,80,85),
        (56, "Mankey", "Fighting", None, 305,40,80,35,35,45,70),
        (57, "Primeape", "Fighting", None, 455,65,105,60,60,70,95),
        (58, "Growlithe", "Fire", None, 350,55,70,45,70,50,60),
        (59, "Arcanine", "Fire", None, 555,90,110,80,100,80,95),
        (60, "Poliwag", "Water", None, 300,40,50,40,40,40,90),
        (61, "Poliwhirl", "Water", None, 385,65,65,65,50,50,90),
        (62, "Poliwrath", "Water", "Fighting", 510,90,95,95,70,90,70),
        (63, "Abra", "Psychic", None, 310,25,20,15,105,55,90),
        (64, "Kadabra", "Psychic", None, 400,40,35,30,120,70,105),
        (65, "Alakazam", "Psychic", None, 500,55,50,45,135,95,120),
        (66, "Machop", "Fighting", None, 305,70,80,50,35,35,35),
        (67, "Machoke", "Fighting", None, 405,80,100,70,50,60,45),
        (68, "Machamp", "Fighting", None, 505,90,130,80,65,85,55),
        (69, "Bellsprout", "Grass", "Poison", 300,50,75,35,70,30,40),
        (70, "Weepinbell", "Grass", "Poison", 390,65,90,50,85,45,55),
        (71, "Victreebel", "Grass", "Poison", 490,80,105,65,100,70,70),
        (72, "Tentacool", "Water", "Poison", 335,40,40,35,50,100,70),
        (73, "Tentacruel", "Water", "Poison", 515,80,70,65,80,120,100),
        (74, "Geodude", "Rock", "Ground", 300,40,80,100,30,30,20),
        (75, "Graveler", "Rock", "Ground", 390,55,95,115,45,45,35),
        (76, "Golem", "Rock", "Ground", 495,80,120,130,55,65,45),
        (77, "Ponyta", "Fire", None, 410,50,85,55,65,65,90),
        (78, "Rapidash", "Fire", None, 500,65,100,70,80,80,105),
        (79, "Slowpoke", "Water", "Psychic", 315,90,65,65,40,40,15),
        (80, "Slowbro", "Water", "Psychic", 490,95,75,110,100,80,30),
        (81, "Magnemite", "Electric", "Steel", 325,25,35,70,95,55,45),
        (82, "Magneton", "Electric", "Steel", 465,50,60,95,120,70,70),
        (83, "Farfetch'd", "Normal", "Flying", 352,52,65,55,58,62,60),
        (84, "Doduo", "Normal", "Flying", 310,35,85,45,35,35,75),
        (85, "Dodrio", "Normal", "Flying", 460,60,110,70,60,60,100),
        (86, "Seel", "Water", None, 325,65,45,55,45,70,45),
        (87, "Dewgong", "Water", "Ice", 475,90,70,80,70,95,70),
        (88, "Grimer", "Poison", None, 325,80,80,50,40,50,25),
        (89, "Muk", "Poison", None, 500,105,105,75,65,100,50),
        (90, "Shellder", "Water", None, 305,30,65,100,45,25,40),
        (91, "Cloyster", "Water", "Ice", 525,50,95,180,85,45,70),
        (92, "Gastly", "Ghost", "Poison", 310,30,35,30,100,35,80),
        (93, "Haunter", "Ghost", "Poison", 405,45,50,45,115,55,95),
        (94, "Gengar", "Ghost", "Poison", 500,60,65,60,130,75,110),
        (95, "Onix", "Rock", "Ground", 385,35,45,160,30,45,70),
        (96, "Drowzee", "Psychic", None, 328,60,48,45,43,90,42),
        (97, "Hypno", "Psychic", None, 483,85,73,70,73,115,67),
        (98, "Krabby", "Water", None, 325,30,105,90,25,25,50),
        (99, "Kingler", "Water", None, 475,55,130,115,50,50,75),
        (100, "Voltorb", "Electric", None, 330,40,30,50,55,55,100),
        (101, "Electrode", "Electric", None, 480,60,50,70,80,80,140),
        (102, "Exeggcute", "Grass", "Psychic", 325,60,40,80,60,45,40),
        (103, "Exeggutor", "Grass", "Psychic", 520,95,95,85,125,65,55),
        (104, "Cubone", "Ground", None, 320,50,50,95,40,50,35),
        (105, "Marowak", "Ground", None ,425,60,80,110,50,80,45),
        (106, "Hitmonlee", "Fighting", None, 455,50,120,53,35,110,87),
        (107, "Hitmonchan", "Fighting", None, 455,50,105,79,35,110,76),
        (108, "Lickitung", "Normal", None, 385,90,55,75,60,75,30),
        (109, "Koffing", "Poison", None, 340,40,65,95,60,45,35),
        (110, "Weezing", "Poison", None, 490,65,90,120,85,70,60),
        (111, "Rhyhorn", "Ground", "Rock", 345,80,85,95,30,30,25),
        (112, "Rhydon", "Ground", "Rock", 485,105,130,120,45,45,40),
        (113, "Chansey", "Normal", None, 450,250,5,5,35,105,50),
        (114, "Tangela", "Grass", None, 435,65,55,115,100,40,60),
        (115, "Kangaskhan", "Normal", None, 490,105,95,80,40,80,90),
        (116, "Horsea", "Water", None, 295,30,40,70,70,25,60),
        (117, "Seadra", "Water", None, 440,55,65,95,95,45,85),
        (118, "Goldeen", "Water", None, 320,45,67,60,35,50,63),
        (119, "Seaking", "Water", None, 450,80,92,65,65,80,68),
        (120, "Staryu", "Water", None, 340,30,45,55,70,55,85),
        (121, "Starmie", "Water", "Psychic", 520,60,75,85,100,85,115),
        (122, "Mr. Mime", "Psychic", "Fairy", 460,40,45,65,100,120,90),
        (123, "Scyther", "Bug", "Flying", 500,70,110,80,55,80,105),
        (124, "Jynx", "Ice", "Psychic", 455,65,50,35,115,95,95),
        (125, "Electabuzz", "Electric", None,490,65,83,57,95,85,105),
        (126, "Magmar", "Fire", None, 495,65,95,57,100,85,93),
        (127, "Pinsir", "Bug", None, 500,65,125,100,55,70,85),
        (128, "Tauros", "Normal", None, 490,75,100,95,40,70,110),
        (129, "Magikarp", "Water", None, 200,20,10,55,15,20,80),
        (130, "Gyarados", "Water", "Flying", 540,95,125,79,60,100,81),
        (131, "Lapras", "Water", "Ice", 535,130,85,80,85,95,60),
        (132, "Ditto", "Normal", None, 288,48,48,48,48,48,48),
        (133, "Eevee", "Normal", None, 325,55,55,50,45,65,55),
        (134, "Vaporeon", "Water", None, 525,130,65,60,110,95,65),
        (135, "Jolteon", "Electric", None, 525,65,65,60,110,95,130),
        (136, "Flareon", "Fire", None, 525,65,130,60,95,110,65),
        (137, "Porygon", "Normal", None, 395,65,60,70,85,75,40),
        (138, "Omanyte", "Rock", "Water", 355,35,40,100,90,55,35),
        (139, "Omastar", "Rock", "Water", 495,70,60,125,115,70,55),
        (140, "Kabuto", "Rock", "Water", 355,30,80,90,55,45,55),
        (141, "Kabutops", "Rock", "Water", 495,60,115,105,65,70,80),
        (142, "Aerodactyl", "Rock", "Flying", 515,80,105,65,60,75,130),
        (143, "Snorlax", "Normal", None, 540,160,110,65,65,110,30),
        (144, "Articuno", "Ice", "Flying", 580,90,85,100,95,125,85),
        (145, "Zapdos", "Electric", "Flying", 580,90,90,85,125,90,100),
        (146, "Moltres", "Fire", "Flying", 580,90,100,90,125,85,90),
        (147, "Dratini", "Dragon", None, 300,41,64,45,50,50,50),
        (148, "Dragonair", "Dragon", None, 420,61,84,65,70,70,70),
        (149, "Dragonite", "Dragon", "Flying", 600,91,134,95,100,100,80),
        (150, "Mewtwo", "Psychic", None, 680,106,110,90,154,90,130),
        (151, "Mew", "Psychic", None, 600,100,100,100,100,100,100)


    ]
    cur.executemany("""
        INSERT INTO pokemon_table (id, name, type_one, type_two, total, hp, attack, defense, sp_attack, sp_defense, speed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""", values_to_insert)
    conn.commit()


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

