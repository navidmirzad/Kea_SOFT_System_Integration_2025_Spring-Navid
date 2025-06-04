import express from "express";
import dotenv from "dotenv";
import pkg from "express-openid-connect"; // middleware for integration with auth0

dotenv.config();

const { auth, requiresAuth } = pkg;

const app = express();

app.use(express.static("public"));

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/logout", (req, res) => {
  res.oidc.logout({ returnTo: process.env.AUTH0_BASE_URL });
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
