require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json());

app.post("/subscribe", async (req, res) => {
  const { token, user_email, price_id } = req.body;

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

app.post("/payment-sheet", async (req, res) => {
  const { user_email, price_id } = req.body;

  try {
    const customer = await stripe.customers.create({ email: user_email });

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2025-05-28.basil' }
    );

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price_id }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });

    const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

    res.send({
      paymentIntent: clientSecret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(4242);
