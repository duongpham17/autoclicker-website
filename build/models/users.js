"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
;
;
;
const schema = new mongoose_1.Schema({
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
schema.pre('save', async function (next) {
    if (!this.isModified('code') || !this.code)
        return next();
    this.code = await bcryptjs_1.default.hash(this.code, 12);
    next();
});
schema.methods.correctPassword = async function (candidateCode, userCode) {
    return bcryptjs_1.default.compare(candidateCode, userCode);
};
schema.methods.createVerifyToken = async function () {
    const verifyToken = crypto_1.default.randomBytes(32).toString('hex');
    const hashToken = crypto_1.default.createHash('sha256').update(verifyToken).digest('hex');
    const code = Math.floor(100000 + Math.random() * 900000);
    this.code = code.toString();
    this.confirmation = hashToken;
    this.confirmation_expiration = Date.now() + (5 * 60 * 1000);
    await this.save();
    return { hashToken, code };
};
const Users = mongoose_1.default.models.Users || (0, mongoose_1.model)('Users', schema);
exports.default = Users;
