import { combineReducers } from '@reduxjs/toolkit';

import authentications from './authentications';
import orders from './orders';

const reducers = combineReducers({
    authentications,
    orders
});

export default reducers;