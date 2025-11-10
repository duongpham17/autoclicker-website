/* FOR DEVELOPMENT
    
    stripe listen --forward-to localhost:8000/api/webhooks

*/

import Stripe from 'stripe';
import { NextFunction, Request, Response } from 'express';
import { asyncBlock } from '../../@utils/helper';
import { stripe_key } from '../../@environment';
import Users from '../../models/users';
import Orders from '../../models/orders';

const stripe = new Stripe(stripe_key.key);

export const paymentIntent = asyncBlock(async (req: Request, res: Response, next: NextFunction) => {
  
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig as string, stripe_key.webhook_paymentIntent);
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const payment = event.data.object as Stripe.PaymentIntent;
            const {credit, user_id} = payment.metadata;
            try{
                await Users.findByIdAndUpdate(user_id, {$inc: {credit: Number(credit)}}, {new: true});
                await Orders.create(payment.metadata);
            } catch(err:any){
                console.log(err)
            }
        break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

  res.status(200).send();
});
