import { Request } from 'express';
import mongoose, { Schema, model, Types, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface IUsersApi {
    _id: string | Types.ObjectId,
    email: string,
    role: "user" | "admin",
    verified: boolean,
    credit: number,
    password: string,
    reset_password_expiration: number,
    reset_link_hash: string,
    createdAt: number,
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>,
    createVerifyToken: () => Promise<string>,
};

export interface InjectUserToRequest extends Request {
    user: IUsersApi
};

export interface IUsersDocument extends Document, IUsersApi {
    _id: Types.ObjectId,
};

const schema = new Schema<IUsersDocument>({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user",
    },
    credit: {
        type: Number,
        default: 1
    },
    password: {
        type: String,
        select: false,
    },
    reset_link_hash: {
        type: String,
        select: false
    },
    reset_password_expiration: {
        type: Number,
        default: () => Date.now() + (1 * 60 * 60 * 1000),
        select: false
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
});

schema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

schema.methods.correctPassword = async function(tryPassword: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(tryPassword, userPassword);
};

schema.methods.createVerifyToken = async function(): Promise<string> {
    const token = crypto.randomBytes(16).toString('hex');
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    this.reset_link_hash = hashToken;
    this.reset_password_expiration = Date.now() + (5 * 60 * 1000); // 5 minute expiry
    await this.save();
    return token;
};
 
const Users: Model<IUsersDocument> = mongoose.models.Users || model<IUsersDocument>('Users', schema);
export default Users;
