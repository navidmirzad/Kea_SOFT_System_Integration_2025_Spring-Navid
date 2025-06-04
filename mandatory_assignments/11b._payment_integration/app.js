import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/stripe-key", (req, res) => {
  res.json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "dkk",
            product_data: {
              name: "T-shirt",
              images: [
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              ],
            },
            unit_amount: 50000, // unit amount is equivalent to 500 kr
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.HOST_URL}/success`,
      cancel_url: `${process.env.HOST_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.get("/success", (req, res) => {
  res.send({ data: "Your purchase was a success! " });
});

app.get("/cancel", (req, res) => {
  res.send({ data: "Something went wrong ..." });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
