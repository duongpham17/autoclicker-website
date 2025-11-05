import { NextFunction, Response, Request } from 'express';
import { appError, asyncBlock } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';
import Scripts from '../models/scripts';
import Users from '../models/users';

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

export const update = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

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

    await Users.findByIdAndUpdate(user._id, {$inc: {credit: 1}}, {new: true});

    if(!data) return next(new appError("Could not remove scripts data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});
