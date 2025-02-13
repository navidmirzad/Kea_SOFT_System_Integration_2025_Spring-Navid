from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/fastapiData")
def getFastAPIData():
    return { "data": "Data from FastAPI" }

@app.get("/requestExpressData")
def getRequestExpressData():
    response = requests.get("http://127.0.0.1:8080/expressData")
    data = response.json()
    return data 

