import {configureStore} from '@reduxjs/toolkit'

import customerReducer from './customer-reducer'

export const store = configureStore({
    reducer: {
        customerReducerPage: customerReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
