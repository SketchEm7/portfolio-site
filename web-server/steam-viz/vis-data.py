import requests

data = requests.get().json()['response']
print( [g['name'] for g in data['games']] )
