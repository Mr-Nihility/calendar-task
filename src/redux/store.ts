import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import taskSlice from './task/task-slice';


const persistConfig = {
    key: 'tasks',
    storage,
}

const persistedReducer = persistReducer(persistConfig, taskSlice)
export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch