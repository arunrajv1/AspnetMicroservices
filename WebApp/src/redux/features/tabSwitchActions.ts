import tabSwitchSlice from "./tabSwitchSlice";
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from "../store";
import { PatientDemographicInitialState } from "../../model/PatientDemographicInitialState";

export const postActions = tabSwitchSlice.actions;

export const setPatientDetailsAction = (arr: PatientDemographicInitialState):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{  
        console.log('array in the action', arr);
        dispatch(postActions.setPatientDemographicDetails(arr))  
    }
}