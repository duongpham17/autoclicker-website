import mongoose, { Schema, model, Types, Document, Model } from 'mongoose';

export interface IScriptsApi {
    _id: string | Types.ObjectId,
    user_id: string | Types.ObjectId,
    name: string,
    max_loop: number,
    commands: IScriptsCommands[],
    description: string,
    usedAt: number,
    createdAt: number,
};

export interface IScriptsCommands {
    _id: string | Types.ObjectId,
    name: string,
    color: string,
    seconds: number,
    delay_at_loop: number,
    keyboard?: string,
    type?: string,
    event?: string,
    click?: string,
    toggle?: string,
    xyrange?: number,
    x?: number,
    y?: number,
    pixel_event?: string,
    pixel_color?: string,
    pixel_x?: number,
    pixel_y?: number,
    pixel_wait?: number
};

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
        default: 10
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
        xyrange: {type: Number},
        x: { type: Number },
        y: { type: Number },
        pixel_event: { type: String },
        pixel_color: { type: String },
        pixel_x: { type: Number },
        pixel_y: { type: Number },
        pixel_wait: {type: Number}
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


const Scripts: Model<IScriptsDocument> = mongoose.models.Scripts || model<IScriptsDocument>('Scripts', schema);
export default Scripts;