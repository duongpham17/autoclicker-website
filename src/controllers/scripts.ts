import { NextFunction, Response, Request } from 'express';
import { appError, asyncBlock } from '../@utils/helper';
import Scripts from '../models/scripts';
import Users, {InjectUserToRequest} from '../models/users';

export const find = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const user = req.user;

    const data = await Scripts.find({user_id: user._id}).sort({createdAt: -1});

    if(!data) return next(new appError("Could not find scripts data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const create = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user.credit === 0) return next(new appError("No credits left", 400)); 

    const data = await Scripts.create({...req.body, user_id: user._id});

    await Users.findByIdAndUpdate(user._id, {$inc: {credit: -1}}, {new: true});

    if(!data) return next(new appError("Could not create scripts data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const update = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const data = await Scripts.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!data) return next(new appError("Could not update scripts data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const remove = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    const data = await Scripts.findByIdAndDelete(req.params.id);

    if(!data) return next(new appError("Could not delete script", 400));

    await Users.findByIdAndUpdate(user._id, {$inc: {credit: data.upgrade}}, {new: true});

    if(!data) return next(new appError("Could not remove scripts data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const search = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    // Escape special regex characters to prevent errors
    const escapedId = req.params.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create a case-insensitive regex
    const regex = new RegExp(escapedId, 'i');

    const data = await Scripts.find({private: false, name: regex}).sort({createdAt: -1});

    if(!data) return next(new appError("Could not find scripts data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const upgrade = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const { _id, upgrade, inc } = req.body;

    // Validate inc
    if (inc !== 1 && inc !== -1) {
        return next(new appError("Invalid operation", 400));
    }

    // Validate upgrade amount
    const amount = Number(upgrade);
    if (!amount || amount <= 0 || amount > 10000) {
        return next(new appError("Invalid upgrade amount", 400));
    }

    const script = await Scripts.findById(_id);
    if (!script) return next(new appError("Script not found", 404));

    const user = await Users.findById(req.user._id);
    if (!user) return next(new appError("User not found", 404));

    // If user needs to spend credit
    if (inc === 1 && user.credit < amount) {
        return next(new appError("Not enough credit", 400));
    }

    // New upgrade value
    const newUpgradeValue = script.upgrade + (inc === 1 ? amount : -amount);
    if (newUpgradeValue < 0) {
        return next(new appError("Upgrade cannot go negative", 400));
    }

    // Apply both updates safely
    const [updatedScript] = await Promise.all([
        Scripts.findByIdAndUpdate(_id, { upgrade: newUpgradeValue }, { new: true }),
        Users.findByIdAndUpdate(req.user._id, { $inc: { credit: inc === 1 ? -amount : amount } }, { new: true })
    ]);

    return res.status(200).json({
        status: "success",
        data: updatedScript
    });
});

