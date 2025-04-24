import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(express.static("videos"));

const PORT = process.env.LOCALPORT ?? 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
