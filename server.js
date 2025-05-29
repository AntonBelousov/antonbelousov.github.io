const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_");

const app = express();
app.use(bodyParser.json());

app.post("/subscribe", async (req, res) => {
  const {
    token,
    user_email,
    price_id
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: user_email,
      source: token
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price_id }]
    });

    res.send({ success: true, subscription });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(4242);
