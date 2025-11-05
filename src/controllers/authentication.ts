import { NextFunction, Request, Response } from 'express';
import { EMAIL_SIGNUP, EMAIL_LOGIN } from '../@email/authnetication';
import { asyncBlock, appError } from '../@utils/helper';
import User, { InjectUserToRequest } from '../models/users';
import jwt from 'jsonwebtoken';

export const createSecureToken = (id: string) => {

    const secret: any = process.env.JWT_SECRET;

    const expires: any = process.env.JWT_EXPIRES;

    const token = jwt.sign({ id }, secret, { expiresIn: `${expires}d` });

    const expireInNumber = Date.now() + (expires * 24 * 60 * 60 * 1000);

    const cookie = {
        token: `Bearer ${token}`,
        expires: expireInNumber,
    };

    return cookie;
};

export const restrict = (roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role)){
            return next(new appError('You do not have permission to perform this action', 403))
        };
        next();
    };
};

export const protect = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return next(new appError('Login to access these features', 401));

    const jwt_secret:any = process.env.JWT_SECRET;

    const decodedId:any = jwt.verify(token, jwt_secret);

    const existingUser = await User.findById(decodedId.id).select('role credit email');

    if(!existingUser) return next(new appError('The user belonging to this token does not exist.', 401));

    req.user = existingUser;

    next();
});

export const persist = asyncBlock(async (req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const id = req.user._id;

    const user = await User.findById(id);

    if(!user) return next(new appError('please log back in for a new token', 401));

    res.status(201).json({
        status: "success",
        data: user
    });
});

export const login = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;

    let user = await User.findOne({email});

    if(!user) return next(new appError("failed", 400));

    const host = req.headers.referer;
    
    if(!host) return next(new appError("Host is unknown", 401))

    const host_url = host.split("/").slice(0,3).join("/");

    if(user){
        const {code} = await user.createVerifyToken();
    
        await EMAIL_LOGIN({
            email: user.email,
            host: host_url,
            code,
        });
    };

    res.status(200).json({
        status: "success",
        message: 'sent'
    });
});

export const signup = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;

    let user = await User.findOne({email});

    if(user) return next(new appError("exist", 401));

    const host = req.headers.referer;
    
    if(!host) return next(new appError("Host is unknown", 401))

    const host_url = host.split("/").slice(0,3).join("/");

    if(!user){
        user = await User.create({ ...req.body, email, verified: false });

        const {code} = await user.createVerifyToken();
    
        await EMAIL_SIGNUP({
            email: user.email,
            host: host_url,
            code,
        });
    };

    res.status(200).json({
        status: "success",
        message: 'sent'
    });
});

export const code = asyncBlock(async (req: Request, res: Response, next: NextFunction) => {
    const {code, email} = req.body;

    let user = await User.findOne({email}).select('+code');

    if(!user) return next(new appError("User does not exist, signup again", 401));

    const linkExpired = Date.now() > user.confirmation_expiration;

    if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

    const correctUser = !user || await user.correctPassword(code, user.code);

    if (!correctUser) return next(new appError("Invalid code", 401));

    user = await User.findOneAndUpdate({email}, {
        $unset: { code: 1, confirmation: 1, link_expiration_time: 1 },
        $set: { verified: true }, 
    }, 
    {new: true});
    
    if(!user) return next(new appError("Invalid code", 401));

    const cookie = createSecureToken(user._id as string);

    res.status(200).json({
        status: "success",
        data: user,
        cookie
    });
});

// export const email = asyncBlock(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.params.token;

//     const [code, confirmation] = token.split("-");

//     let user = await User.findOne({confirmation}).select('+code');

//     if(!user) return next(new appError("User does not exist, signup again.", 401));
    
//     const linkExpired = Date.now() > user.confirmation_expiration;

//     if(linkExpired) return next(new appError("This confirmation code no longer exist", 401));

//     const correctUser = !user || await user.correctPassword(code, user.code);

//     if (!correctUser) return next(new appError("User does not exist, signup again.", 401));

//     user = await User.findOneAndUpdate({email}, {
//         $unset: { code: 1, confirmation: 1, link_expiration_time: 1 },
//         $set: { verified: true }, 
//     }, 
//     {new: true});

//     if(!user) return next(new appError("User does not exist, signup again.", 401));

//     const cookie = createSecureToken(user._id as string);

//     res.status(200).json({
//         status: "success",
//         data: user,
//         cookie
//     });
// });