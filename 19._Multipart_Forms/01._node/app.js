import express from "express";
import multer from "multer";
const app = express();
const upload = multer({ destination: "uploads/" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/form", (req, res) => {
  delete req.body.password;
  console.log(req.body);
  res.send(req.body);
});

app.post("/fileform", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
