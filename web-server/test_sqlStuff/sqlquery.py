from flask import jsonify
import sqlite3
import pandas as pd

data_url = 'https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv'
headers = ['first_name', 'last_name', 'address', 'city', 'state', 'zip']
data_table = pd.read_csv(data_url, header=None, names=headers, converters={'zip': str})


# connect to database
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


conn = sqlite3.connect('example.db')
conn.row_factory = dict_factory
cur = conn.cursor()


def create_table():
    cur.execute(
        'CREATE TABLE IF NOT EXISTS data_table(first_name TEXT, last_name TEXT, address TEXT, city TEXT, state TEXT, zip TEXT)')


def dynamic_data_entry():
    results = sql_query('''SELECT * FROM data_table''')
    return jsonify([
        {
            'first_name': result['first_name'],
            'last_name': result['last_name'],
            'address': result['address'],
            'city': result['city'],
            'state': result['state'],
            'zip': result['zip']
        }
        for result in results
    ])


conn.row_factory = sqlite3.Row


# functions for queries


def sql_query(query):
    cur.execute(query)
    rows = cur.fetchall(cd)
    return rows


def sql_edit_insert(query, var):
    cur.execute(query, var)
    conn.commit()


def sql_delete(query, var):
    cur.execute(query, var)


def sql_query2(query, var):
    cur.execute(query, var)
    rows = cur.fetchall()
    return rows


create_table()
dynamic_data_entry()
