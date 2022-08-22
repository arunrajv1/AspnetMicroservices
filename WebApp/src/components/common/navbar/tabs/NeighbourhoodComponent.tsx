import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  FormControl,
  FormHelperText,
  Tab,
  TextField,
} from "@mui/material";
import React, { SyntheticEvent, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPatientDemographicDetails } from "../../../../redux/features/tabSwitchSlice";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import { patientTabConstants } from "../../../patient/patient-tabs";
import PatientDemographicComponent from "../../../patient/PatientDemographicComponent";
import PatientEmployerComponent from "../../../patient/patientEmployerComponent";

const ariaLabel = { "aria-label": "description" };
const initialFormData: any = Object.freeze({
  MiddleName: "",
  FirstName: "",
  LastName: "",
  Suffix: "",
});

const NeighbourhoodComponent = () => {
  const [value, setValue] = useState("0");
  const [isDisable, setIsDisable] = useState(false);
  const [formData, updateFormData] = useState(initialFormData);
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  //const patientDemographicSelector = useAppSelector((state) => state.data.array);
  const patientDemographics = useSelector((state: RootState)=>state.patientDemographics.array)
  //const navigate = useNavigate();
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleFormChange = (e: any) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const getPatientData = (inputData: any) => {
    let tempFormData = { ...inputData };
    updateFormData(tempFormData);
  };

  const changeFieldDisable = (inputData: any) => {
    setIsDisable(inputData);
  };

  const setDataOnTabChange = (inputData: any) =>{
    dispatch(setPatientDemographicDetails(inputData));
    console.log("patientDemographicSelector", patientDemographics);
  }

  const customStyles = {
    background: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: "0px",
      paddingRight: "0px",
      backgroundColor: "#242424",
    },
    tabBackground: {
      backgroundColor: "#4a4a4a",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      "& button": { color: "#ededed" },
    },
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl error={hasError}>
          <TextField
            name="LastName"
            // label="Last Name"
            placeholder="Last Name"
            variant="standard"
            onChange={handleFormChange}
            inputProps={ariaLabel}
            value={formData.LastName}
            disabled={isDisable}
          />
          {hasError && !formData.LastName && (
            <FormHelperText>*Required!</FormHelperText>
          )}
        </FormControl>
        <FormControl error={hasError}>
          <TextField
            name="FirstName"
            // label="First Name"
            placeholder="First Name"
            variant="standard"
            onChange={handleFormChange}
            inputProps={ariaLabel}
            value={formData.FirstName}
            disabled={isDisable}
          />
          {hasError && !formData.LastName && (
            <FormHelperText>*Required!</FormHelperText>
          )}
        </FormControl>
        <TextField
          name="MiddleName"
          // label="Middle Name"
          placeholder="Middle Name"
          variant="standard"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.MiddleName}
          disabled={isDisable}
        />
        <FormControl error={hasError}>
          <TextField
            name="Suffix"
            // label="Suffix"
            placeholder="Suffix"
            variant="standard"
            onChange={handleFormChange}
            inputProps={ariaLabel}
            value={formData.Suffix}
            disabled={isDisable}
          />
          {hasError && !formData.LastName && (
            <FormHelperText>*Required!</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box sx={customStyles.tabBackground}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons
              TabIndicatorProps={{
                sx: { backgroundColor: "#97d700" },
              }}
              sx={{
                "& button.Mui-selected": { color: "#97d700" },
              }}
            >
              {patientTabConstants.map((item, index) => {
                return (
                  <Tab
                    key={item.id}
                    value={item.value}
                    label={item.label}
                  ></Tab>
                );
              })}
            </TabList>
          </Box>
          <TabPanel sx={customStyles.background} value="0">
            {
              <PatientDemographicComponent
                formData={formData}
                onSavePatientData={getPatientData}
                onChangeDisable={changeFieldDisable}
                onTabChange={setDataOnTabChange}
              ></PatientDemographicComponent>
            }
          </TabPanel>
          <TabPanel sx={customStyles.background} value="1">
            Item One
          </TabPanel>
          <TabPanel sx={customStyles.background} value="2">
            Item Two
          </TabPanel>
          <TabPanel sx={customStyles.background} value="3">
            {
              <PatientEmployerComponent
                formData={formData}
              ></PatientEmployerComponent>
            }
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default NeighbourhoodComponent;
