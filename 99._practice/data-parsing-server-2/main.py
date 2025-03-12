import json
import xmltodict
import yaml
import csv

def csv_parsing():
    results = []
    try: 
        with open("../data-types/file.csv", newline="", encoding="utf-8") as csvfile:
            csv_reader = csv.DictReader(csvfile)
            for row in csv_reader:
                results.append(row)
            print("csv: ", results)
            return results
    except Exception as error:
        print("Error reading CSV file: ", error)

def json_parsing():
    results = []
    try:
        with open("../data-types/file.json", "r", encoding="utf-8") as jsonfile:
            jsonData = json.load(jsonfile)
            results.append(jsonData)
            print("Json: ", results)
            return jsonData
    except Exception as error:
        print("Error reading JSON file: ", error)

def txt_parsing():
    results = []
    try:
        with open("../data-types/file.txt", "r", encoding="utf-8") as txtfile:
            data = txtfile.read()
            results.append(data)
            print("txt: ", results)
            return data
    except Exception as error:
        print("Error reading txt file: ", error)

def xml_parsing():
    results = []
    try: 
        with open("../data-types/file.xml", "r", encoding="utf-8") as xmlfile:
            xmlData = xmlfile.read()
            parsed_data = xmltodict.parse(xmlData)
            results.append(parsed_data)
            print("xml: ", results)
            return parsed_data
    except Exception as error:
        print("Error reading xml file: ", error)

def yaml_parsing():
    results = []
    try: 
        with open("../data-types/file.yaml", "r", encoding="utf-8") as yamlfile:
            yamlData = yamlfile.read()
            parsed_data = yaml.safe_load(yamlData)
            results.append(parsed_data)
            print("yaml: ", results)
            return parsed_data
    except Exception as error:
        print("Error reading yaml file: ", error)

csv_parsing()
json_parsing()
txt_parsing()
xml_parsing()
yaml_parsing()