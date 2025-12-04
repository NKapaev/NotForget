import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskListShown: false,
}

export const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        showTaskList: (state) => {
            state.taskListShown = true;
        },
        hideTaskList: (state) => {
            state.taskListShown = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { showTaskList, hideTaskList } = taskListSlice.actions

export default taskListSlice.reducer