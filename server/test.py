import requests

url = 'http://localhost:8080/api/filtre/image'
files = {'image': open('', 'rb')}
response = requests.post(url, files=files)

print(response.json())
