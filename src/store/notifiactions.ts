import { createSlice } from '@reduxjs/toolkit';

export const notificationsReducer = createSlice({
    initialState: {
        message: '',
        type: ''
    },
    name: 'notifications',
    reducers: {
        resetNotification: (state) => {
            state.message = '';
            state.type = '';
        },
        setErrorNotification: (state, action) => {
            state.message = action.payload;
            state.type = 'error';
        },
        setInfoNotification: (state, action) => {
            state.message = action.payload;
            state.type = 'info';
        },
        setSuccessNotification: (state, action) => {
            state.message = action.payload;
            state.type = 'success';
        }
    }
});

export const {
    setErrorNotification,
    setInfoNotification,
    setSuccessNotification,
    resetNotification
} = notificationsReducer.actions;

export default notificationsReducer.reducer;
