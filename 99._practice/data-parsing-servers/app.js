import fs from "fs";
import xml2js from "xml2js";
import yaml from "js-yaml";
import csv from "csv-parser";

console.log("Data parsing server one: node.js");

function csvParsing() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("../data-types/file.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("csv: ", results);
        resolve(results);
      })
      .on("error", (error) => {
        console.log("Error reading CSV file: ", error);
        reject(error);
      });
  });
}

function jsonParsing() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.readFile("../data-types/file.json", "utf-8", (error, data) => {
      if (error) {
        console.log("Error reading json file: ", error);
        return reject(error);
      }
      try {
        const jsonData = JSON.parse(data);
        results.push(jsonData);
        console.log("json: ", results);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

function txtParsing() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.readFile("../data-types/file.txt", "utf-8", (error, data) => {
      if (error) {
        console.log("Error reading txt file: ", error);
        return reject(error);
      }
      results.push(data);
      console.log("txt: ", results);
      resolve(data);
    });
  });
}

function xmlParsing() {
  return new Promise((resolve, reject) => {
    const resultsArray = [];
    const xmlParser = new xml2js.Parser();
    fs.readFile("../data-types/file.xml", "utf-8", (error, data) => {
      if (error) {
        console.log("Error reading xml file: ", error);
        return reject(error);
      }

      xmlParser.parseString(data, (error, results) => {
        if (error) {
          console.log("Error parsing xml: ", error);
          return reject(error);
        } else {
          resultsArray.push(results);
          console.log("xml: ", resultsArray);
          resolve(results);
        }
      });
    });
  });
}

function yamlParsing() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.readFile("../data-types/file.yaml", "utf-8", (error, data) => {
      if (error) {
        console.log("Error reading yaml file: ", error);
        return reject(error);
      }

      try {
        const yamlData = yaml.load(data);
        results.push(yamlData);
        console.log("yaml: ", results);
        if (!yamlData) {
          return reject(error);
        }
        resolve(yamlData);
      } catch (parseError) {
        console.log("error parsing YAML file: ", parseError);
        reject(parseError);
      }
    });
  });
}

csvParsing();
jsonParsing();
txtParsing();
xmlParsing();
yamlParsing();
