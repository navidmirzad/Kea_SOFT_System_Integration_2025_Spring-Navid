import fs from "fs";
import xml2js from "xml2js";
import yaml from "js-yaml";
import csv from "csv-parser";

fs.readFile("./data_files/data.json", "utf8", (error, data) => {
  if (error) {
    console.log(`Could not read data from ${data}.`, error);
  }
  const jsonData = JSON.parse(data);

  console.log("JSON: ");
  jsonData.friends.forEach((friend) => {
    console.log(friend);
  });
});

const xmlParser = new xml2js.Parser();

fs.readFile("./data_files/data.xml", "utf8", (error, data) => {
  if (error) {
    console.log("Error reading XML file", error);
    return;
  }
  xmlParser.parseString(data, (error, result) => {
    if (error) {
      console.log("Error parsing XML", error);
    }
    const friends = result.friends.friend;
    console.log("XML: ");
    friends.forEach((friend) => {
      console.log(friend);
    });
  });
});

fs.readFile("./data_files/data.yaml", "utf8", (error, data) => {
  if (error) {
    console.log("Error reading YAML file", error);
    return;
  }

  try {
    const yamlData = yaml.load(data);

    console.log("YAML: ");
    yamlData.friends.forEach((friend) => {
      console.log(friend);
    });
  } catch (error) {
    console.log("Error parsing YAML file", error);
  }
});

const results = [];

fs.createReadStream("./data_files/data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log("CSV: ");
    results.forEach((friend) => {
      console.log(friend);
    });
  })
  .on("error", (error) => {
    console.log("Error reading CSV file", error);
  });

fs.readFile("./data_files/data.txt", "utf8", (error, data) => {
  if (error) {
    console.log("Error reading txt file", error);
    return;
  }
  console.log("TXT: " + data);
});
