import mongoose, { Schema, model, Types, Document, Model } from 'mongoose';

export interface IOrdersApi {
    _id: string | Types.ObjectId,
    user_id: string | Types.ObjectId,
    email: string,
    credit: number,
    createdAt: number,
};

export interface IOrdersDocument extends Document, IOrdersApi {
    _id: Types.ObjectId,
};

const schema = new Schema<IOrdersDocument>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    credit: {
        type: Number
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
});

const Orders: Model<IOrdersDocument> = mongoose.models.Orders || model<IOrdersDocument>('Orders', schema);

export default Orders;