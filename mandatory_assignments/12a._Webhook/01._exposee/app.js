import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import fetch from "node-fetch";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Webhook API",
    version: "1.0.0",
    description: "API for managing webhooks",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const FILE = path.join(dirname, "webhooks.json");

const loadWebhooks = () => {
  return JSON.parse(fs.readFileSync(FILE));
};

const saveWebhooks = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

const acceptedEvents = [
  "payment_received",
  "payment_processed",
  "invoice_processed",
  "payment_completed",
];

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new webhook
 *     description: |
 *       This endpoint allows you to create a new webhook by providing a URL and the events it should listen to.
 *       You can associate multiple events to a single URL, and events can be appended to an existing URL if already registered.
 *     operationId: createWebhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - events
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to which events will be sent.
 *               events:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [payment_received, payment_processed, invoice_processed, payment_completed]
 *                 description: A list of events the webhook should listen to.
 *     responses:
 *       201:
 *         description: Webhook created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Webhook created
 *       400:
 *         description: Invalid request payload or event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid payload
 */
app.post("/create", (req, res) => {
  const { url, events } = req.body;

  if (!url || !Array.isArray(events)) {
    return res.status(400).send({ data: "Invalid payload" });
  }

  const webhooks = loadWebhooks();

  const existingUrl = webhooks.find((webhook) => webhook.url === url);

  if (existingUrl) {
    existingUrl.events = [...new Set([...existingUrl.events, ...events])];
  } else {
    webhooks.push({ url, events });
  }

  saveWebhooks(webhooks);

  res.status(201).send({ data: "Webhook created" });
});

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a webhook by URL
 *     description: |
 *       This endpoint deletes a webhook by its URL. If the URL is registered, it will be removed along with associated events.
 *     operationId: deleteWebhook
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the webhook to be deleted.
 *     responses:
 *       200:
 *         description: Webhook deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Webhook deleted
 *       404:
 *         description: Webhook not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Webhook URL not found
 */
app.delete("/delete", (req, res) => {
  const { url } = req.body;
  const webhooks = loadWebhooks();

  webhooks.forEach((webhook) => {
    if (webhook.url === url) {
      webhooks.splice(webhook, 1);
      saveWebhooks(webhooks);
    }
  });

  return res.status(200).send({ data: `Url: ${url} deleted` });
});

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping all registered webhook URLs
 *     description: |
 *       This endpoint sends a ping request to all registered webhooks and returns the results.
 *       It can help check if the webhooks are still reachable and active.
 *     operationId: pingWebhooks
 *     responses:
 *       200:
 *         description: Results of the ping requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       events:
 *                         type: array
 *                         items:
 *                           type: string
 *                       error:
 *                         type: string
 *                         description: Error message if the ping fails
 *                         example: "timeout"
 *                       success:
 *                         type: boolean
 *                         example: true
 */
app.get("/ping", async (req, res) => {
  const webhooks = loadWebhooks();
  const results = [];

  for (const webhook of webhooks) {
    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: webhook.url, events: webhook.events }),
      });

      results.push({
        url: webhook.url,
        events: webhook.events,
      });
    } catch (err) {
      results.push({ url: webhook.url, error: err.message });
    }
  }

  res.status(200).send({ data: results });
});

app.post("/webhook", (req, res) => {
  console.log(req.body);
  res.send({ data: "Webhook called" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
