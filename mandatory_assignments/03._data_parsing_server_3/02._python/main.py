from fastapi import FastAPI
from data_parser import parse_json, parse_xml, parse_yaml, parse_csv, parse_txt
import requests


app = FastAPI()

@app.get("/json")
def get_json():
    return parse_json()

@app.get("/xml")
def get_xml():
    return parse_xml()

@app.get("/yaml")
def get_yaml():
    return parse_yaml()

@app.get("/csv")
def get_csv():
    return parse_csv()

@app.get("/txt")
def get_txt():
    return parse_txt()

# Node server

@app.get("/nodeJson")
def get_node_json():
    response = requests.get("http://localhost:8080/json")
    data = response.json()
    return {"data": data}

@app.get("/nodeXml")
def get_node_xml():
    response = requests.get("http://localhost:8080/xml")
    data = response.json()
    return {"data": data}

@app.get("/nodeYaml")
def get_node_yaml():
    response = requests.get("http://localhost:8080/yaml")
    data = response.json()
    return {"data": data}

@app.get("/nodeCsv")
def get_node_csv():
    response = requests.get("http://localhost:8080/csv")
    data = response.json()
    return {"data": data}

@app.get("/nodeTxt")
def get_node_txt():
    response = requests.get("http://localhost:8080/txt")
    data = response.json()
    return {"data": data}