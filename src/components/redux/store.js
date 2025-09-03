import { configureStore } from '@reduxjs/toolkit'

import taskListReducer from "./taskListSlice"

export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
    },
})