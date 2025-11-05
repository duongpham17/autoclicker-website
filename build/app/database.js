"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database = async () => {
    try {
        if (mongoose_1.default.connection.readyState === 1) {
            console.log("Reused existing database connection!");
            return;
        }
        const database = process.env.DATABASE;
        const databasePassword = process.env.DATABASE_PASSWORD;
        const dbUri = database.replace('<password>', encodeURIComponent(databasePassword));
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect(dbUri);
        const development = process.env.NODE_ENV === "development";
        if (development)
            console.log("DB connection successful!");
    }
    catch (err) {
        console.error("Could not connect to database", err);
    }
};
exports.default = database;
