import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import { persistStore } from 'redux-persist'; // Persist the store with redux-persist
import thunk from 'redux-thunk'; // Middleware for handling async actions
import rootReducer from './redux'; // Import the rootReducer which combines all reducers

// Create the Redux store using configureStore (more efficient and modern)
const store = configureStore({
    reducer: rootReducer, // Root reducer (which combines all your reducers)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Apply thunk middleware
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

// Create the persistor to persist the Redux state (used by redux-persist)
export const persistor = persistStore(store);

// Export the Redux store to be used in the app
export default store;