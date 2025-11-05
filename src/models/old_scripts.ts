import mongoose, { Schema, model, Types, Document } from 'mongoose';
import { IScriptsApi } from './scripts';

export interface IScriptsDocument extends Document, IScriptsApi {
    _id: Types.ObjectId,
};

const schema = new Schema<IScriptsDocument>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String
    },
    max_loop: {
        type: Number,
        default: 0
    },
    commands: [{
        name: { type: String},
        color: { type: String },
        seconds: { type: Number},
        delay_at_loop: { type: Number },
        event: { type: String },
        keyboard: { type: String },
        type: { type: String },
        click: { type: String },
        toggle: {type: String},
        x: { type: Number },
        y: { type: Number },
        pixel_event: { type: String },
        pixel_color: { type: String },
        pixel_x: { type: Number },
        pixel_y: { type: Number },
    }],
    usedAt: {
        type: Number,
        default: Date.now
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
});


const Scripts = mongoose.models.Scripts || model<IScriptsDocument>('Old Scripts', schema);
export default Scripts;