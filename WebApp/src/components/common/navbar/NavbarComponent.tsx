import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AppBar, Box, makeStyles, Tabs, Typography, Tab, styled } from "@mui/material";
import React, { useState } from "react";
import LandingPageComponent from "../LandingPageComponent";
import NeighbourhoodComponent from "./tabs/NeighbourhoodComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const NavbarComponent = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const headerStyles = {
    wrapper: {
      backgroundColor: "#4a4a4a",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      paddingTop: "20px",
      // color: "#e4f0e4"
    },
    tabContext: {
      padding: "0px",
    },
  };

  const useStyles = {
    tab: {
      paddingLeft: "0px",
      paddingRight: "0px",
      paddingBottom: "0px",
    },
  };

  const CustomTab = styled(Tab)({
    color: "#ededed",
  });

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={headerStyles.wrapper}>
          <TabList
            centered
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{
              sx: { backgroundColor: '#97d700'}
            }}
            sx={{
              "& button.Mui-selected" : {color: '#97d700'}
            }}
          >
            <CustomTab label="Desktop" value="1" />
            <CustomTab label="Neighbourhood" value="2" />
            <CustomTab label="Find Case" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={useStyles.tab} value="1">
          Desktop open
        </TabPanel>
        <TabPanel sx={useStyles.tab} value="2">
          {<NeighbourhoodComponent></NeighbourhoodComponent>}
        </TabPanel>
        <TabPanel sx={useStyles.tab} value="3">
          Find Case Open
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default NavbarComponent;
