import { NextFunction, Response, Request } from 'express';
import { appError, asyncBlock } from '../@utils/helper';
import Users from '../models/users';

export const find = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const data = await Users.find().sort({createdAt: -1});

    if(!data) return next(new appError("Could not find analysis data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const create = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const data = await Users.create(req.body);

    if(!data) return next(new appError("Could not create analysis data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const update = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const data = await Users.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!data) return next(new appError("Could not update analysis data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const remove = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const data = await Users.findByIdAndDelete(req.params.id);

    if(!data) return next(new appError("Could not remove analysis data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});
