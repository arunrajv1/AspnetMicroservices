import { configureStore } from "@reduxjs/toolkit";
import tabSwitchReducer from "./features/tabSwitchSlice";
import patientDemographicReducer from "./features/patientDemographicSlice"

export const store = configureStore({
  reducer: { 
    patientDemographics: tabSwitchReducer,
    patientDetails: patientDemographicReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;