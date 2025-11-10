import { NextFunction, Response } from 'express';
import Stripe from 'stripe';
import { asyncBlock } from '../../@utils/helper';
import { InjectUserToRequest } from '../../models/users';

const secret_key = process.env.ENV === "production" ? process.env.STRIPE_PROD_SECRET_KEY as string : process.env.STRIPE_TEST_SECRET_KEY as string;
const stripe = new Stripe(secret_key);

export const credit = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

  const { credit } = req.body;

  if (!credit || typeof credit !== 'number' || credit <= 0 || !Number.isInteger(credit)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid credit amount' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    automatic_payment_methods: { enabled: true},
    amount: Number(credit) * 200,
    currency: 'gbp',
    metadata: {
      credit: credit.toString(),
      user_id: req.user._id.toString(),
      email: req.user.email,
    },
  });

  return res.status(200).json({
    status: 'success',
    clientSecret: paymentIntent.client_secret,
  });
});