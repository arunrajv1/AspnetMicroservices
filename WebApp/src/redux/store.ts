import { configureStore } from "@reduxjs/toolkit";
import tabSwitchReducer from "./features/tabSwitchSlice";
import patientDemographicSliceReducer from "./features/patientDemographicSlice"

export const store = configureStore({
  reducer: { 
    //patientDemographics: tabSwitchReducer,
    patientDetails: patientDemographicSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;