import { Request } from 'express';
import mongoose, { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface IUsersApi {
    _id: string | Types.ObjectId,
    name: string,
    email: string,
    role: "user" | "admin",
    verified: boolean,
    credit: number,
    code: string,
    confirmation: string,
    confirmation_expiration: number,
    createdAt: number,
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>,
    createVerifyToken: () => Promise<{ hashToken: string, code: string }>
};

export interface InjectUserToRequest extends Request {
    user: IUsersApi
};

export interface IUsersDocument extends Document, IUsersApi {
    _id: Types.ObjectId,
};

const schema = new Schema<IUsersDocument>({
    name: {
        type: String,
        trim: true,
        lowercase: true,
    },
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
    verified: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        select: false,
    },
    confirmation: {
        type: String,
        select: false,
    },
    confirmation_expiration: {
        type: Number,
        default: () => Date.now() + (1 * 60 * 60 * 1000),
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
});

// Hash code before save
schema.pre('save', async function(next) {
    if (!this.isModified('code') || !this.code) return next();
    this.code = await bcrypt.hash(this.code, 12);
    next();
});

schema.methods.correctPassword = async function(candidateCode: string, userCode: string): Promise<boolean> {
    return bcrypt.compare(candidateCode, userCode);
};

schema.methods.createVerifyToken = async function() {
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hashToken = crypto.createHash('sha256').update(verifyToken).digest('hex');
    const code = Math.floor(100000 + Math.random() * 900000);
    this.code = code.toString();
    this.confirmation = hashToken;
    this.confirmation_expiration = Date.now() + (5 * 60 * 1000);
    await this.save();
    return { hashToken, code };
};

const Users = mongoose.models.Users || model<IUsersDocument>('Users', schema);
export default Users;
