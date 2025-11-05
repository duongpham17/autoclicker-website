import { Request } from 'express';
import { IUsersApi } from '../../models/users';

export interface InjectUserToRequest extends Request {
    user: IUsersApi
}