import express from "express";
import parsers from "./data-parse-server-1.js";

const app = express();
const PORT = process.env.LOCALPORT || 8080;

app.get("/", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>Data Parsing Server</title>
        </head>
        <body>
          <h1>Welcome to the Data Parsing Server!</h1>
          <p>Select one of the following data formats to view the parsed data:</p>
          <ul>
            <li><a href="/json">JSON Data</a></li>
            <li><a href="/xml">XML Data</a></li>
            <li><a href="/yaml">YAML Data</a></li>
            <li><a href="/csv">CSV Data</a></li>
            <li><a href="/txt">TXT Data</a></li>
          </ul>
        </body>
      </html>
    `);
});

app.get("/json", async (req, res) => {
  try {
    const data = await parsers.jsonParsing();
    res.send({ data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/xml", async (req, res) => {
  try {
    const data = await parsers.xmlParsing();
    res.send({ data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/yaml", async (req, res) => {
  try {
    const data = await parsers.yamlParsing();
    res.send({ data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/csv", async (req, res) => {
  try {
    const data = await parsers.csvParsing();
    res.send({ data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/txt", async (req, res) => {
  try {
    const data = await parsers.txtParsing();
    res.send({ data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PYTHON SERVER

const pythonServer = "http://localhost:8000";

app.get("/pythonJson", async (req, res) => {
  try {
    const response = await fetch(`${pythonServer}/json`);
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch JSON Data from Python server" });
  }
});

app.get("/pythonXml", async (req, res) => {
  try {
    const response = await fetch(`${pythonServer}/xml`);
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch XML Data from Python server" });
  }
});

app.get("/pythonYaml", async (req, res) => {
  try {
    const response = await fetch(`${pythonServer}/yaml`);
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch YAML Data from Python server" });
  }
});

app.get("/pythonCsv", async (req, res) => {
  try {
    const response = await fetch(`${pythonServer}/csv`);
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch CSV Data from Python server" });
  }
});

app.get("/pythonTxt", async (req, res) => {
  try {
    const response = await fetch(`${pythonServer}/txt`);
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to fetch TXT Data from Python server" });
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on PORT: ", PORT);
});
