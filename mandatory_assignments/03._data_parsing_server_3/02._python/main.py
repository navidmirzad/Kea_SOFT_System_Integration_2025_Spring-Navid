from fastapi import FastAPI
from data_parser import parse_json, parse_xml, parse_yaml, parse_csv, parse_txt

app = FastAPI()

@app.get("/json")
def get_json():
    return {"data": parse_json()}

@app.get("/xml")
def get_xml():
    return {"data": parse_xml()}

@app.get("/yaml")
def get_yaml():
    return {"data": parse_yaml()}

@app.get("/csv")
def get_csv():
    return {"data": parse_csv()}

@app.get("/txt")
def get_txt():
    return {"data": parse_txt()}
