import { combineReducers, configureStore } from '@reduxjs/toolkit'
import basketSlice from './slices/basketSlice';
import restaurantSlice from './slices/restaurantSlice';
const rootReducer = combineReducers({
    basket: basketSlice,
    restaurant: restaurantSlice,
})
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
