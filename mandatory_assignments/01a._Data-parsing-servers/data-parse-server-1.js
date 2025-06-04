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
        console.log("JSON: ", jsonData);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

function xmlParsing() {
  return new Promise((resolve, reject) => {
    const xmlParser = new xml2js.Parser({ explicitArray: false }); // prevents values from being wrapped in arrays
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
        const friends = result.friends.friend; // extract to js object
        if (!friends) {
          return reject(new Error("No friends found in XML"));
        }
        console.log("XML: ", friends);
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
        console.log("YAML: ", yamlData);
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
        console.log("CSV: ", results);

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

      try {
        // turning the txt file into an array of objects
        const lines = data.trim().split("\n");
        const result = lines.map((line) => {
          const obj = {};
          const parts = line.split(",");
          parts.forEach((part) => {
            const [key, value] = part.split(":");
            if (key && value) {
              obj[key.trim()] = value.trim();
            }
          });
          return obj;
        });
        console.log("TXT parsed to object:", result);
        resolve(result);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

/* jsonParsing();
xmlParsing();
yamlParsing();
csvParsing();
txtParsing(); */

export default {
  jsonParsing,
  xmlParsing,
  yamlParsing,
  csvParsing,
  txtParsing,
};
