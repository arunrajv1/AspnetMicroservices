import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const commonUISlice = createSlice({
    name: 'commonUIElements',
    initialState: { data: false },
    reducers: {
        setSpinnerState(state, action: PayloadAction<boolean>) {
            state.data = action.payload
        }
    }
});
export const { setSpinnerState } = commonUISlice.actions;
export default commonUISlice.reducer;