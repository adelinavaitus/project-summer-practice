import { createStore, applyMiddleware, compose } from 'redux'; // Import necessary functions for creating the Redux store
import thunk from 'redux-thunk'; // Import thunk middleware for handling asynchronous actions
import rootReducer from './redux'; // Import the rootReducer which combines all reducers
import { persistStore } from "redux-persist"; // Import persistStore to persist the Redux state

const initialState = {};    // Define the initial state for the Redux store (empty in this case)

// Define the middleware to use (thunk for handling async actions)
const middleware = [thunk];

// Create the Redux store with the rootReducer, initial state, and middleware applied
const store = createStore(
    rootReducer, // Root reducer to handle state updates
    initialState, // Initial state of the store
    compose(
     applyMiddleware(...middleware),    // Apply middleware (thunk in this case)
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    // Enable Redux DevTools Extension if available in the browser
    )
);

// Create the persistor to persist the Redux state (this is used by redux-persist)
export const persistor = persistStore(store);

// Export the created Redux store to be used in the application
export default store; 