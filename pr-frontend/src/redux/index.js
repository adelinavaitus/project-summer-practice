import { combineReducers } from 'redux'; // Import combineReducers to combine multiple reducers
import { persistReducer } from 'redux-persist'; // Import persistReducer for persisting state
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist to store state in local storage
import apiReducers from './apiReducers'; // Import the apiReducers to handle API-related state

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // Key used to store the state in the local storage
    storage, // Specify the storage method (localStorage in this case)
    whitelist: ['receivedUser'] // Define which reducer states will be persisted (only 'receivedUser' here)
}
// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    receivedUser: apiReducers   // Combine the 'receivedUser' state from apiReducers
});

// Export the rootReducer wrapped with persistReducer to enable state persistence
export default persistReducer(persistConfig, rootReducer);
