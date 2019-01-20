import os
import sqlite3
import pandas as pd

data_url = 'https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv'
headers = ['first_name', 'last_name', 'address', 'city', 'state', 'zip']
data_table = pd.read_csv(data_url, header=None, names=headers, converters={'zip': str})

# create db
conn = sqlite3.connect('example.db')

# add data
data_table.to_sql('data_table', conn, dtype={
    'first_name': 'VARCHAR(256)',
    'last_name': 'VARCHAR(256)',
    'address': 'VARCHAR(256)',
    'city': 'VARCHAR(256)',
    'state': 'VARCHAR(2)',
    'zip': 'VARCHAR(5)'

})

conn.row_factory = sqlite3.Row
# functions for queries


def sql_query(query):
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    return rows


def sql_edit_insert(query, var):
    cur = conn.cursor()
    cur.execute(query, var)
    conn.commit()


def sql_delte(query, var):
    cur = conn.cursor()
    cur.execute(query, var)


def sql_query2(query, var):
    cur = conn.cursor()
    cur.execute(query, var)
    rows = cur.fetchall()
    return rows
