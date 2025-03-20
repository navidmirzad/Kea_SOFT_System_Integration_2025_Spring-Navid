import express from "express";
import usersRouter from "./routers/usersRoute.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

app.use(usersRouter);

const swaggerDefinition = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Users API",
      version: "0.0.1",
    },
  },
  apis: ["./routers/*.js"],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routers/*.js"],
};

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("App is listening on PORT: ", PORT);
});
