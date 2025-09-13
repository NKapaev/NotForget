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
        toggleTaskListOpen: (state) => {
            state.taskListShown = !state.taskListShown
        }
    },
})

// Action creators are generated for each case reducer function
export const { showTaskList, hideTaskList, toggleTaskListOpen } = taskListSlice.actions

export default taskListSlice.reducer