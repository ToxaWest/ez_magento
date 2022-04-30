import { createSlice } from '@reduxjs/toolkit';

export const popupReducer = createSlice({
    initialState: {
        popupId: ''
    },
    name: 'popup',
    reducers: {
        hidePopup: (state) => {
            state.popupId = '';
        },
        showPopup: (state, { payload }) => {
            state.popupId = payload;
        }
    }
});

export const { hidePopup, showPopup } = popupReducer.actions;

export default popupReducer.reducer;
