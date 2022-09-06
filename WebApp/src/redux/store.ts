import { configureStore } from "@reduxjs/toolkit";
import tabSwitchReducer from "./features/tabSwitchSlice";
import patientDemographicSliceReducer from "./features/patientDemographicSlice"
import commonUISliceReducer from "./features/commonUISlice";

export const store = configureStore({
  reducer: { 
    //patientDemographics: tabSwitchReducer,
    patientDetails: patientDemographicSliceReducer,
    commonUIElements: commonUISliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;