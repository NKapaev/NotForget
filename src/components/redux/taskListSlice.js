import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskListShown: false,
    previousListShown: false,
}

export const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        showTaskList: (state) => {
            state.taskListShown = true;
            state.previousListShown = true;
        },
        hideTaskList: (state) => {
            state.taskListShown = false;
            state.previousListShown = false;
        },
    },
})

export const { showTaskList, hideTaskList } = taskListSlice.actions

export default taskListSlice.reducer