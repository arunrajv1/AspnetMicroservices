import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Input, Tab } from "@mui/material";
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
    updateFormData({...formData,
      MiddleName: inputData.MiddleName,
      FirstName: inputData.FirstName,
      LastName: inputData.LastName,
      Suffix: inputData.Suffix
    });
    console.log('data from child', inputData, formData);
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
        <Input
          name="LastName"
          placeholder="Last Name"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.LastName}
        />
        <Input
          name="FirstName"
          placeholder="First Name"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.FirstName}
        />
        <Input
          name="MiddleName"
          placeholder="Middle Name"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.MiddleName}
        />
        <Input
          name="Suffix"
          placeholder="Suffix"
          onChange={handleFormChange}
          inputProps={ariaLabel}
          value={formData.Suffix}
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
