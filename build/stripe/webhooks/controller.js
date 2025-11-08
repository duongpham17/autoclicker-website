"use strict";
/* FOR DEVELOPMENT
    
    stripe listen --forward-to localhost:8000/api/webhooks

*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const helper_1 = require("../../@utils/helper");
const users_1 = __importDefault(require("../../models/users"));
const orders_1 = __importDefault(require("../../models/orders"));
const secret_key = process.env.ENV === "production" ? process.env.STRIPE_PROD_SECRET_KEY : process.env.STRIPE_TEST_SECRET_KEY;
const endpointSecret = process.env.ENV === "production" ? process.env.STRIPE_PROD_WEBHOOK_SECRET : process.env.STRIPE_TEST_WEBHOOK_SECRET;
const stripe = new stripe_1.default(secret_key);
exports.paymentIntent = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const payment = event.data.object;
            const { credit, user_id } = payment.metadata;
            try {
                await users_1.default.findByIdAndUpdate(user_id, { $inc: { credit: Number(credit) } }, { new: true });
                await orders_1.default.create(payment.metadata);
            }
            catch (err) {
                console.log(err);
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send();
});
