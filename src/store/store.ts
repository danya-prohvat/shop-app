import {configureStore} from '@reduxjs/toolkit'

import customerReducer from './customer-reducer'
import laptopsReducer from './laptops-reducer'

export const store = configureStore({
    reducer: {
        customerReducerPage: customerReducer,
        laptopsReducerPage: laptopsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
