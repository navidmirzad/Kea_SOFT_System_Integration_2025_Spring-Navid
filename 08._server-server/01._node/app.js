import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send({ data: "EVERYTHING LITTY I LUV WHEN ITS HAWT" }); // this is actually a JS-Object but gets sent as JSON
  //res.send("Data from express.");
});

//app.use(express.static("public"));

app.get("/requestFastAPIData", async (req, res) => {
  const response = await fetch("http://127.0.0.1:8000/fastapiData");
  const result = await response.json();

  res.send(result);
  //res.send({ data: result.data });
});

app.get("/expressData", (req, res) => {
  res.send({ data: "Data from Express" });
});

app.get("/names/:name", (req, res) => {
  console.log(req.params.name);
  res.send({ data: `Your name is ${req.params.name}` });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
