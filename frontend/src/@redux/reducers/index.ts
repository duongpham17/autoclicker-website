import { combineReducers } from '@reduxjs/toolkit';

import authentications from './authentications';
import users from './users';
import orders from './orders';

const reducers = combineReducers({
    authentications,
    orders,
    users
});

export default reducers;