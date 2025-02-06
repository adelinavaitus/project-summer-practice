import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiReducers from './apiReducers';


const persistConfig = {
    key: 'root',
    storage,
    whitelist:['receivedUser']
}

const rootReducer = combineReducers({
    receivedUser: apiReducers
});

export default persistReducer(persistConfig,rootReducer);
