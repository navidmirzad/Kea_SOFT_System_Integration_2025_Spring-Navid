import express from "express";

const app = express();

app.use(express.static("public"));

const randomNumbers = [1, 25, 74];

function addRandomNumber() {
  setInterval(() => {
    const newNumber = getRandomInt(0, 100);
    randomNumbers.push(newNumber);
  }, 5000);
}

addRandomNumber();

app.get("/randomNumbers", (req, res) => {
  res.send({ data: randomNumbers });
});

app.get("/simulatenewnumbers", (req, res) => {
  const newNumber = getRandomInt(0, 100);
  randomNumbers.push(newNumber);

  res.send({ data: newNumber });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
