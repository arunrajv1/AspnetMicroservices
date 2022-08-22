import { configureStore } from "@reduxjs/toolkit";
import tabSwitchSlice from "./features/tabSwitchSlice";

const store = configureStore({
  reducer: { 
    data: tabSwitchSlice.reducer 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;