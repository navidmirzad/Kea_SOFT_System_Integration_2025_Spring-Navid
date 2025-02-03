import json
import xmltodict
import yaml
import csv

with open("./data_files/data.json", "r", encoding="utf8") as file:
    json_data = json.load(file)

print("JSON: ")
for friend in json_data["friends"]:
    print(friend)

with open("./data_files/data.xml", "r", encoding="utf8") as file:
    xml_data = xmltodict.parse(file.read())

xml_friends = xml_data["friends"]["friend"]
print("XML: ")
for friend in xml_friends:
    print(friend)

with open("./data_files/data.yaml", "r", encoding="utf8") as file:
    yaml_data = yaml.safe_load(file)

yaml_friends = yaml_data["friends"]

print("YAML: ")
for friend in yaml_friends:
    print(friend)

with open("./data_files/data.csv", "r", encoding="utf8") as file:
    csv_data = csv.DictReader(file)

    print("CSV: ")
    for friends in csv_data:
        print(friends)

with open("./data_files/data.txt", "r", encoding="utf8") as file:
    txt_data = file.read()
    print("TXT: ")
    print(txt_data)