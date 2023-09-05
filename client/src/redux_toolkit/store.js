import { configureStore } from '@reduxjs/toolkit';
import { Users } from './slices/Users';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
export const store = configureStore({
    reducer: {
        [Users.reducerPath]: Users.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Users.middleware)
});

setupListeners(store.dispatch);