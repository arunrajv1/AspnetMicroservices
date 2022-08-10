import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientTabConstants } from "../../../patient/patient-tabs";
import PatientDemographicComponent from "../../../patient/PatientDemographicComponent";

const ariaLabel = { "aria-label": "description" };
const initialFormData: any = Object.freeze({
  MiddleName: "",
  FirstName: "",
  LastName: "",
  Suffix: "",
  isDisabled: false,
});

const NeighbourhoodComponent = () => {
  const [value, setValue] = useState("0");
  const [formData, updateFormData] = useState(initialFormData);
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
    let tempFormData = {...inputData};
    console.log("before binding", formData);
    updateFormData(tempFormData);
    console.log("after binding", formData);
  };

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
        <TextField
          name="LastName"
          // label="Last Name"
          placeholder="Last Name"
          variant="standard"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.LastName}
          disabled={formData.isDisabled}
        />
        <TextField
          name="FirstName"
          // label="First Name"
          placeholder="First Name"
          variant="standard"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.FirstName}
          disabled={formData.isDisabled}
        />
        <TextField
          name="MiddleName"
          // label="Middle Name"
          placeholder="Middle Name"
          variant="standard"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.MiddleName}
          disabled={formData.isDisabled}
        />
        <TextField
          name="Suffix"
          // label="Suffix"
          placeholder="Suffix"
          variant="standard"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.Suffix}
          disabled={formData.isDisabled}
        />
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
            Item Three
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default NeighbourhoodComponent;
