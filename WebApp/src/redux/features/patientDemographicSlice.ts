import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PatientDemographicInitialState } from "../../model/PatientDemographicInitialState";

const defaultState = {
    address: {
        home_street1: "",
        home_street2: "",
        home_city: "",
        home_state: "",
        home_postal_code: "",
        home_country: "",
        home_phone: "",
        work_phone: "",
    },
    mrn: [{}],
    birth_sex: "",
    date_of_birth: "",
    ssn: "",
    race: "",
    marital_status: "",
    employment_status: "",
    student_status: "",
    deceased: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    suffix: "",
    id: "",
};

const patientDemographicSlice = createSlice({
    name: 'patientDetails',
    initialState: defaultState,
    reducers: {
        setAllPatientDetails(state, action: PayloadAction<PatientDemographicInitialState>) {
            state = action.payload
            console.log('all patient data state', state);
        },
        setSinglePatientDetails(state, action: PayloadAction<any>) {
            state = action.payload
            console.log('single patient data slice', state);
        }
    }
});

export const { setAllPatientDetails, setSinglePatientDetails } = patientDemographicSlice.actions;

export default patientDemographicSlice.reducer;

