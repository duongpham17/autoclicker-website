"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.password = exports.remove = exports.update = exports.create = exports.find = void 0;
const helper_1 = require("../@utils/helper");
const users_1 = __importDefault(require("../models/users"));
exports.find = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const data = await users_1.default.find().sort({ createdAt: -1 });
    if (!data)
        return next(new helper_1.appError("Could not find user data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.create = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const data = await users_1.default.create(req.body);
    if (!data)
        return next(new helper_1.appError("Could not create user data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.update = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const data = await users_1.default.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!data)
        return next(new helper_1.appError("Could not update user data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.remove = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const data = await users_1.default.findByIdAndDelete(req.user._id);
    if (!data)
        return next(new helper_1.appError("Could not remove user data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.password = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const { password } = req.body;
    const user = await users_1.default.findById(req.user._id).select('+password');
    if (!user)
        return next(new helper_1.appError("User not found", 404));
    user.password = password;
    await user.save();
    return res.status(200).json({
        status: "success",
        data: user
    });
});
