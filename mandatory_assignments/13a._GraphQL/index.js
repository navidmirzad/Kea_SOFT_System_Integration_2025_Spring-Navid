import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers.js";

// typeDefs = what data and operations are available
const typeDefs = readFileSync("./schema.graphql", "utf-8");

// Create an Express app
const app = express();

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers, // how to get that data
});

// Start Apollo Server
await server.start();

app.use(cors()); // Allow cross-origin
app.use(express.json());
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => ({}),
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
