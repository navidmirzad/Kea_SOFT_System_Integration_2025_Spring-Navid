import fetch from "node-fetch";

const deleteWebhook = async () => {
  const res = await fetch("http://localhost:8080/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: "http://localhost:8081/webhook",
    }),
  });

  const data = await res.json();
  console.log("Delete response:", data);
};

deleteWebhook();
