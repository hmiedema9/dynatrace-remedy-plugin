import requests
import json

response = requests.get('<URL+API_TOKEN>')
jsonData = response.json()

def test(data):
    for key in data['result']:
        if key == 'problems':
            if not data['result'][key]:
                print("no problems")
            else:
                print(data['result'][key])

test(jsonData)
print(jsonData)