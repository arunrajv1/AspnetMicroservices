import { configureStore } from "@reduxjs/toolkit";
import tabSwitchReducer from "./features/tabSwitchSlice";

export const store = configureStore({
  reducer: { 
    patientDemographics: tabSwitchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;