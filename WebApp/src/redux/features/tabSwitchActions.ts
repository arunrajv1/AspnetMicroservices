import tabSwitchSlice from "./tabSwitchSlice";
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from "..";

export const postActions = tabSwitchSlice.actions;

export const setPatientDetailsAction = (arr: any):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState)=>{  
        console.log('array in ta action', arr);
        dispatch(postActions.setPatientDemographicDetails(arr))  
    }
}