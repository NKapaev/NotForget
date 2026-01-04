import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stack: [],
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.stack.push(action.payload);
        },
        closeModal: (state, action) => {
            state.stack = state.stack.filter(
                modal => modal.id !== action.payload
            );
        },
        closeLastModal: (state) => {
            state.stack.pop();
        },
        closeAllModals: (state) => {
            state.stack = [];
        },
    },
});

export const {
    openModal,
    closeModal,
    closeLastModal,
    closeAllModals,
} = modalsSlice.actions;

export default modalsSlice.reducer;