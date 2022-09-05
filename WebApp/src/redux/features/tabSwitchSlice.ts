import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PatientDemographicInitialState } from "../../model/PatientDemographicInitialState";

const defaultState = {
  home_street1: "",
  home_street2: "",
  home_city: "",
  home_state: "",
  home_postal_code: "",
  home_country: "",
  home_phone: "",
  work_phone: "",
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

const tabSwitchSlice = createSlice({
  name: "patientDemographics",
  initialState: {
    array: defaultState
  },
  reducers: {
    setPatientDemographicDetails(state, action: PayloadAction<PatientDemographicInitialState>) {
      state.array = action.payload;
      console.log('array in the reducer', state.array);
    },
    /*
    setBlankDetails(state, action: PayloadAction<any>) {
      state.array = action.payload;
      console.log("setBlankDetails action.payload", state.array);
    },*/
  },
});

export const { setPatientDemographicDetails } = tabSwitchSlice.actions;

export default tabSwitchSlice.reducer;
