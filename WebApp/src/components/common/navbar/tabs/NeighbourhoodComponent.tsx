import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Input, Tab } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientTabConstants } from "../../../patient/patient-tabs";
import PatientDemographicComponent from "../../../patient/PatientDemographicComponent";
import PatientEmployerComponent  from "../../../patient/patientEmployerComponent";

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
        />
        <Input
          name="FirstName"
          placeholder="First Name"
          onChange={handleFormChange}
          inputProps={ariaLabel}
        />
        <Input
          name="MiddleName"
          placeholder="Middle Name"
          onChange={handleFormChange}
          inputProps={ariaLabel}
        />
        <Input
          name="Suffix"
          placeholder="Suffix"
          onChange={handleFormChange}
          inputProps={ariaLabel}
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
            {<PatientDemographicComponent formData={formData}></PatientDemographicComponent>}            
          </TabPanel>
          <TabPanel sx={customStyles.background} value="1">
            Item One
          </TabPanel>
          <TabPanel sx={customStyles.background} value="2">
            Item Two
          </TabPanel>
          <TabPanel sx={customStyles.background} value="3">
          {<PatientEmployerComponent formData = {formData}></PatientEmployerComponent>}
          </TabPanel>
        </TabContext>
        {/* 
        <Box sx={{ maxWidth: { xs: 1000, sm: 900 } }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          variant="scrollable"
          scrollButtons
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          {patientTabConstants.map((item, index) => {
            return (
              <Tab key={item.id} value={item.route} label={item.label}></Tab>
            );
          })}
        </Tabs>
        </Box> */}
      </Box>
    </>
  );
};

export default NeighbourhoodComponent;
