import fs from "fs";
import xml2js from "xml2js";
import yaml from "js-yaml";
import csv from "csv-parser";

function jsonParsing() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data_files/data.json", "utf8", (error, data) => {
      if (error) {
        console.log(`Could not read data from ${data}.`, error);
        return reject(error);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

function xmlParsing() {
  return new Promise((resolve, reject) => {
    const xmlParser = new xml2js.Parser();
    fs.readFile("./data_files/data.xml", "utf8", (error, data) => {
      if (error) {
        console.log("Error reading XML file", error);
        return reject(error);
      }
      xmlParser.parseString(data, (error, result) => {
        if (error) {
          console.log("Error parsing XML", error);
          return reject(error);
        }
        const friends = result.friends.friend;
        if (!friends) {
          return reject(new Error("No friends found in XML"));
        }
        resolve(friends);
      });
    });
  });
}

function yamlParsing() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data_files/data.yaml", "utf8", (error, data) => {
      if (error) {
        console.log("Error reading YAML file", error);
        return reject(error);
      }

      try {
        const yamlData = yaml.load(data);
        if (!yamlData) {
          return reject(error);
        }
        resolve(yamlData);
      } catch (parseError) {
        console.log("Error parsing YAML file", parseError);
        reject(parseError);
      }
    });
  });
}

function csvParsing() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("./data_files/data.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        console.error("Error reading CSV file", error);
        reject(error);
      });
  });
}

function txtParsing() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data_files/data.txt", "utf8", (error, data) => {
      if (error) {
        console.log("Error reading txt file", error);
        return reject(error);
      }
      resolve(data);
    });
  });
}

export default {
  jsonParsing,
  xmlParsing,
  yamlParsing,
  csvParsing,
  txtParsing,
};
