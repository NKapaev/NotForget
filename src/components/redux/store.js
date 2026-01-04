import { configureStore } from '@reduxjs/toolkit'

import taskListReducer from "./taskListSlice"
import modalsReducer from "./modalsSlice"

export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
        modals: modalsReducer,
    },
})