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

const tabSwitchSlice = createSlice({
  name: "get",
  initialState: {
    loading: false,
    id: 0,
    array: defaultState,
    error: null,
  },
  reducers: {
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setPatientDemographicDetails(state, action: PayloadAction<PatientDemographicInitialState>) {
        console.log('array in the reducer', action.payload);
        state.array = action.payload;
    },
    /*
    setBlankDetails(state, action: PayloadAction<any>) {
      state.array = action.payload;
      console.log("setBlankDetails action.payload", state.array);
    },*/
  },
});

export default tabSwitchSlice;
