import fetch from "node-fetch";

const registerWebhook = async () => {
  const res = await fetch("http://localhost:8080/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: "http://localhost:8081/webhook",
      events: ["payment_completed"],
    }),
  });

  const data = await res.json();
  console.log("Register response:", data);
};
registerWebhook();
