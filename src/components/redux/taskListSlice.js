import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskListShown: false,
    wasClosedBeforeDrag: false,
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
        setWasClosedBeforeDrag: (state, action) => {
            state.wasClosedBeforeDrag = action.payload;
        },
    },
})

export const { showTaskList, hideTaskList, setWasClosedBeforeDrag } = taskListSlice.actions

export default taskListSlice.reducer