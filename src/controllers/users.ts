import { NextFunction, Response, Request } from 'express';
import { appError, asyncBlock } from '../@utils/helper';
import Users, {InjectUserToRequest} from '../models/users';

export const find = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const data = await Users.find().sort({createdAt: -1});

    if(!data) return next(new appError("Could not find user data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const create = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const data = await Users.create(req.body);

    if(!data) return next(new appError("Could not create user data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const update = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const data = await Users.findByIdAndUpdate(req.user._id, req.body, {new: true});

    if(!data) return next(new appError("Could not update user data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const remove = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const data = await Users.findByIdAndDelete(req.user._id);

    if(!data) return next(new appError("Could not remove user data", 400));

    return res.status(200).json({
        status: "success",
        data
    });
  
});

export const password = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const {password} = req.body;

    const user = await Users.findById(req.user._id).select('+password');

    if (!user) return next(new appError("User not found", 404));

    user.password = password;
    await user.save();

    return res.status(200).json({
        status: "success",
        data: user
    });
  
});
