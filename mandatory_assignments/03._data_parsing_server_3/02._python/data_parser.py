import json
import xmltodict
import yaml
import csv
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data_files"))


def parse_json(file_path=os.path.join(BASE_DIR, "data.json")):
    with open(file_path, "r", encoding="utf8") as file:
        return json.load(file)

def parse_xml(file_path=os.path.join(BASE_DIR, "data.xml")):
    with open(file_path, "r", encoding="utf8") as file:
        xml_data = xmltodict.parse(file.read())
    return xml_data["friends"]["friend"]

def parse_yaml(file_path=os.path.join(BASE_DIR, "data.yaml")):
    with open(file_path, "r", encoding="utf8") as file:
        return yaml.safe_load(file)["friends"]

def parse_csv(file_path=os.path.join(BASE_DIR, "data.csv")):
    with open(file_path, "r", encoding="utf8") as file:
        return list(csv.DictReader(file))

def parse_txt(file_path=os.path.join(BASE_DIR, "data.txt")):
    with open(file_path, "r", encoding="utf8") as file:
        return file.read()

parse_json()
parse_xml()
parse_yaml()
parse_csv()
parse_txt()