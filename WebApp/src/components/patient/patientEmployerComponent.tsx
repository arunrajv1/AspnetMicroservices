import {
  Input,
  Box,
  Tabs,
  Tab,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  FormControlLabel,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  tableCellClasses,
  ButtonProps,
  Button,
  IconButton,
  Tooltip,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import { postData } from "../../services/PatientServices";
import AlertDialog from "../common/alert-popup/AlertDialog";
import "./patientEmployerComponent.css";

const re = /^[0-9\b]+$/;

const defaultEmployerValues = {
  emp_name: "",
  emp_id: "",
  //address: {},
  home_street1: "",
  home_street2: "",
  home_city: "",
  home_state: "",
  home_postal_code: "",
  home_country: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  suffix: "",
  id: "",
  date_of_birth: "",
};

const defaultAlertProps: any = Object.freeze({
  alertContent: "",
  alertType: "",
  alertTitle: "",
  isAlertOpen: false,
});

const PatientEmployerComponent = (props: any) => {
  const [formValues, setFormValues] = useState(defaultEmployerValues);
  // const [formContactValues, setFormContactValues] = useState(
  //   defaultEmpContactValues
  // );
  const [alertState, setAlertState] = useState(false);
  const [alertProps, updateAlertProps] = useState(defaultAlertProps);

  const handleEmpInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const CustomButton = styled(Button)<ButtonProps>({
    backgroundColor: "#97d700",
    borderColor: "#97d700",
    "&:hover": {
      backgroundColor: "#81b800",
      color: "#000000",
    },
  });

  const CustomCardHeader = styled(CardHeader)({
    fontSize: 18,
    color: "#ededed",
    backgroundColor: "#828282",
  });

  const saveEmpData = async () => {
    formValues.emp_id = props.formData.emp_id;
    formValues.emp_name = props.formData.EmployerName;
    formValues.home_city = props.formData.home_city;
    formValues.home_country = props.formData.home_country;
    formValues.home_postal_code = props.formData.home_postal_code;
    formValues.home_state= props.formData.home_state;
    formValues.home_street1= props.formData.home_street1;
    formValues.home_street2= props.formData.home_street2;
    formValues.first_name = props.formData.FirstName;
    formValues.last_name = props.formData.LastName;
    formValues.middle_name = props.formData.MiddleName;
    formValues.suffix = props.formData.Suffix;
    formValues.id = "";
   

    console.log("json post body", formValues);

    await postData(formValues)
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          setAlertState(true);
          updateAlertProps({
            ...alertProps,
            alertContent: "Data Inserted Successfully",
            alertType: "success",
            alertTitle: "Success",
            isAlertOpen: true,
          });
        } else {
          setAlertState(true);
          updateAlertProps({
            ...alertProps,
            alertContent: "Error Occured",
            alertType: "error",
            alertTitle: "Error",
            isAlertOpen: true,
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Box 
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        flexGrow: 1
        // width: "95%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={saveEmpData}
    >
      {alertState ? <AlertDialog alertProps={alertProps}></AlertDialog> : <></>}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }} spacing={2} columns={16}>
        <Container fluid  >
          <Row>
            <Col>1 of 2</Col>
            <Col xs={3}>1 of 2 (wider)</Col>
            <Col>
              <CustomButton
                type="button"
                onClick={saveEmpData}
                variant="contained"
              >
                Save
              </CustomButton> 
             </Col>
          </Row>
          </Container>
        <Grid item xs={7}>
          <Card>
            <CustomCardHeader title="Employer Information"></CustomCardHeader>
            <CardContent>
              <Stack>
                <TextField
                  id="emp_name"
                  label="Employer name"
                  variant="standard"
                  type="text"
                  name="emp_name"
                  value={formValues.emp_name}
                  onChange={handleEmpInputChange}
                />
              </Stack>
              <Stack>
                <TextField
                  id="emp_id"
                  label="Employee ID"
                  variant="standard"
                  type="text"
                  name="emp_id"
                  value={formValues.emp_id}
                  onChange={handleEmpInputChange}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader
              title="Address"
              sx={{
                fontSize: 18,
                color: "#ededed",
                backgroundColor: "#828282",
              }}
            />
            <CardContent>
              <Stack>
                <TextField
                  id="txtStreet1"
                  label="Street 1"
                  variant="standard"
                  type="text"
                  name="home_street1"
                  value={formValues.home_street1}
                  onChange={handleEmpInputChange}
                />
              </Stack>
              <Stack>
                <TextField
                  id="txtStreet2"
                  label="Street 2"
                  variant="standard"
                  type="text"
                  name="home_street2"
                  value={formValues.home_street2}
                  onChange={handleEmpInputChange}
                />
              </Stack>
              <Stack direction="horizontal" gap={3} className="col-md-12">
                <TextField
                  id="txtCity"
                  label="City"
                  variant="standard"
                  type="text"
                  className="col-md-3"
                  name="home_city"
                  value={formValues.home_city}
                  onChange={handleEmpInputChange}
                />
                <TextField
                  id="txtState"
                  label="State"
                  variant="standard"
                  type="text"
                  className="col-md-9"
                  name="home_state"
                  value={formValues.home_state}
                  onChange={handleEmpInputChange}
                />
              </Stack>
              <Stack direction="horizontal" gap={3} className="col-md-12">
                <TextField
                  id="txtPostalCode"
                  label="Postal Code"
                  variant="standard"
                  type="number"
                  className="col-md-3 input::-webkit-inner-spin-button"
                  name="home_postal_code"
                  value={formValues.home_postal_code}
                  onChange={handleEmpInputChange}
                />
                <TextField
                  id="txtCountry"
                  label="Country"
                  variant="standard"
                  type="text"
                  className="col-md-9"
                  name="home_country"
                  value={formValues.home_country}
                  onChange={handleEmpInputChange}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
      
    </Box>
  );
};

export default PatientEmployerComponent;
