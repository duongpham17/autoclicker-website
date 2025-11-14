import { NextFunction, Response } from 'express';
import Stripe from 'stripe';
import { stripe_key } from '../../@environment';
import { asyncBlock } from '../../@utils/helper';
import { InjectUserToRequest } from '../../models/users';

const stripe = new Stripe(stripe_key.key);

export const credit = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

  const { credit } = req.body;

  if (!credit || typeof credit !== 'number' || credit <= 0 || !Number.isInteger(credit)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid credit amount' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    automatic_payment_methods: { enabled: true},
    amount: Number(credit) * 500,
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