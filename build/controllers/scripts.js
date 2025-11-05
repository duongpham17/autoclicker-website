"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.find = void 0;
const helper_1 = require("../@utils/helper");
const scripts_1 = __importDefault(require("../models/scripts"));
const users_1 = __importDefault(require("../models/users"));
exports.find = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const user = req.user;
    const data = await scripts_1.default.find({ user_id: user._id }).sort({ createdAt: -1 });
    if (!data)
        return next(new helper_1.appError("Could not find scripts data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.create = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const user = req.user;
    if (user.credit === 0)
        return next(new helper_1.appError("No credits left", 400));
    const data = await scripts_1.default.create({ ...req.body, user_id: user._id });
    await users_1.default.findByIdAndUpdate(user._id, { $inc: { credit: -1 } }, { new: true });
    if (!data)
        return next(new helper_1.appError("Could not create scripts data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.update = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const data = await scripts_1.default.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!data)
        return next(new helper_1.appError("Could not update scripts data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
exports.remove = (0, helper_1.asyncBlock)(async (req, res, next) => {
    const user = req.user;
    const data = await scripts_1.default.findByIdAndDelete(req.params.id);
    await users_1.default.findByIdAndUpdate(user._id, { $inc: { credit: 1 } }, { new: true });
    if (!data)
        return next(new helper_1.appError("Could not remove scripts data", 400));
    return res.status(200).json({
        status: "success",
        data
    });
});
