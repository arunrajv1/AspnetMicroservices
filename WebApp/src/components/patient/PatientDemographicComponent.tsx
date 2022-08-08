import { TabContext, TabList, TabPanel } from "@mui/lab";
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
  AppBar,
  Toolbar,
  InputBase,
  alpha,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { formatDate } from "../../services/CommonServices";
import { getDataById, postData } from "../../services/PatientServices";
import AlertDialog from "../common/alert-popup/AlertDialog";
import SearchIcon from "@mui/icons-material/Search";

const re = /^[0-9\b]+$/;
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const formLabelStyling = {
  color: "rgba(200, 132, 39, .8)",
  maxWidth: 200,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#828282",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const CustomCardHeader = styled(CardHeader)({
  fontSize: 18,
  color: "#ededed",
  backgroundColor: "#828282",
});

const CustomButton = styled(Button)<ButtonProps>({
  backgroundColor: "#97d700",
  borderColor: "#97d700",
  "&:hover": {
    backgroundColor: "#81b800",
    color: "#000000",
  },
});

export interface IMedicalRecordNumber {
  recordNumber: string;
  facility: string;
}

const validate = (values: any) => {
  let errors: any = {};
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "notes",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const defaultValues = {
  address: {},
  mrn: [],
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

const defaultContactValues = {
  home_street1: "",
  home_street2: "",
  home_city: "",
  home_state: "",
  home_postal_code: "",
  home_country: "",
  home_phone: "",
  work_phone: "",
};

const defaultMRN = [
  {
    recordNumber: "",
    facility: "",
  },
];

const defaultAlertProps: any = Object.freeze({
  alertContent: "",
  alertType: "",
  alertTitle: "",
  isAlertOpen: false,
});

const PatientDemographicComponent = (props: any) => {
  const [deceased, setDeceased] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [age, setAge] = useState<number>();
  const [hasError, setHasError] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const [formContactValues, setFormContactValues] =
    useState(defaultContactValues);
  const [formMRN, setFormMRN] = useState(defaultMRN);
  const [alertState, setAlertState] = useState(false);
  const [alertProps, updateAlertProps] = useState(defaultAlertProps);
  const [searchId, setSearchId] = useState("");
  const [isSaveDisable, setIsSaveDisable] = useState(false);
  // const [rowAction, setRowAction] = useState<IMedicalRecordNumber[]>([
  //   { recordNumber: "", facility: "" },
  // ]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleContactInputChange = (e: any) => {
    let { name, value } = e.target;
    if (e.target.name == "home_phone") {
      let returnData = handleHomePhoneNumber(e);
      value = returnData.toString();
    } else if (e.target.name == "work_phone") {
      let returnData = handleWorkPhoneNumber(e);
      value = returnData.toString();
    }
    setFormContactValues({
      ...formContactValues,
      [name]: value,
    });
  };

  const handleFormMRN = (e: any, index: number) => {
    const { name, value } = e.target;
    // setFormMRN([...formMRN].at(index)?.facility = value
    // )
    console.log("before change", formMRN);
    if (name == "facility")
      // setFormMRN(([...formMRN][index].facility = value));
      setFormMRN({
        ...formMRN,
        [name]: value,
      });
    else if (name == "recordNumber")
      setFormMRN(([...formMRN][index].recordNumber = value));
    console.log("after change", formMRN);
  };

  const handleDeceased = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setDeceased(false);
    else setDeceased(true);
  };
  const handleDOBChange = (newValue: Date | null) => {
    if (newValue) {
      var diff_ms = Date.now() - newValue.getTime();
      var age_dt = new Date(diff_ms);

      setAge(Math.abs(age_dt.getUTCFullYear() - 1970));
    }
    setDateOfBirth(newValue as Date);
  };

  const createData = (recordNumber: string, facility: string) => {
    return { recordNumber, facility };
  };

  const addRow = () => {
    let rows = formMRN;
    rows.push(createData("", ""));
    setFormMRN(rows);
    console.log(formMRN);
  };
  const removeRow = (index: number) => {
    let rows = formMRN;
    rows.splice(index, 1);
    setFormMRN(rows);
    console.log("row deleted", formMRN);
  };

  const handleHomePhoneNumber = (e: any) => {
    if (e.target.value === "" || re.test(e.target.value)) {
      return Number(e.target.value);
    } else if (e.target.value.length == 1) {
      return "";
    } else {
      return Number(e.target.value.slice(0, e.target.value.length - 1));
    }
  };

  const handleWorkPhoneNumber = (e: any) => {
    if (e.target.value === "" || re.test(e.target.value)) {
      return Number(e.target.value);
    } else if (e.target.value.length == 1) {
      return "";
    } else {
      return Number(e.target.value.slice(0, e.target.value.length - 1));
    }
  };

  const bindPatientDetails = (formData: any) => {
    setFormValues({
      ...formValues,
      address: {},
      mrn: [],
      birth_sex: formData.birth_sex,
      date_of_birth: formData.date_of_birth,
      ssn: formData.ssn,
      race: formData.race,
      marital_status: formData.marital_status,
      employment_status: formData.employment_status,
      student_status: formData.student_status,
      deceased: formData.deceased,
      id: formData.id,
    });
    handleDOBChange(formData.date_of_birth)
    const patientNameData: any = {
      FirstName: formData.first_name,
      LastName: formData.last_name,
      MiddleName: formData.middle_name,
      Suffix: formData.suffix,
    };
    props.onSavePatientData(patientNameData);
    console.log("incoming data", formData[0]);
  };

  const handleId = (event: any) => {
    setSearchId(event.target.value);
  };

  const getPatientDetailsById = async () => {
    await getDataById(searchId).then((response) => {
      console.log(response);
      if (
        response.status == 200 &&
        response.statusText == "OK" &&
        response.data.length > 0
      ) {
        setAlertState(true);
        updateAlertProps({
          ...alertProps,
          alertContent: "Patient Found",
          alertType: "success",
          alertTitle: "Success",
          isAlertOpen: true,
        });

        setIsSaveDisable(true);
        bindPatientDetails(response.data[0]);
      } else {
        setAlertState(true);
        updateAlertProps({
          ...alertProps,
          alertContent: "Patient Not Found",
          alertType: "error",
          alertTitle: "Error",
          isAlertOpen: true,
        });
      }
    });
  };

  const savePatientData = async () => {
    formValues.address = formContactValues;
    formValues.first_name = props.formData.FirstName;
    formValues.last_name = props.formData.LastName;
    formValues.middle_name = props.formData.MiddleName;
    formValues.suffix = props.formData.Suffix;
    formValues.date_of_birth = formatDate(dateOfBirth);
    formValues.id = "";
    deceased ? (formValues.deceased = "Y") : (formValues.deceased = "N");

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
        // width: "95%",
      }}
      noValidate
      autoComplete="off"
      onSubmit={savePatientData}
    >
      {alertState ? <AlertDialog alertProps={alertProps}></AlertDialog> : <></>}
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Container fluid>
          <Row>
            <Col>
              <AppBar position="static">
                <Toolbar
                  style={{
                    padding: "0",
                    marginRight: "0",
                    position: "absolute",
                  }}
                >
                  <Search>
                    <SearchIcon />
                    <InputBase
                      onChange={handleId}
                      type="text"
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </Toolbar>
              </AppBar>
              <CustomButton
                type="button"
                onClick={getPatientDetailsById}
                variant="contained"
              >
                Search
              </CustomButton>
            </Col>
            <Col>
              <CustomButton
                type="button"
                onClick={savePatientData}
                variant="contained"
                disabled={isSaveDisable}
              >
                Save
              </CustomButton>
            </Col>
          </Row>
        </Container>
        <Grid item xs={5}>
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
                  value={formContactValues.home_street1}
                  onChange={handleContactInputChange}
                />
              </Stack>
              <Stack>
                <TextField
                  id="txtStreet2"
                  label="Street 2"
                  variant="standard"
                  type="text"
                  name="home_street2"
                  value={formContactValues.home_street2}
                  onChange={handleContactInputChange}
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
                  value={formContactValues.home_city}
                  onChange={handleContactInputChange}
                />
                <TextField
                  id="txtState"
                  label="State"
                  variant="standard"
                  type="text"
                  className="col-md-9"
                  name="home_state"
                  value={formContactValues.home_state}
                  onChange={handleContactInputChange}
                />
              </Stack>
              <Stack direction="horizontal" gap={3} className="col-md-12">
                <TextField
                  id="txtPostalCode"
                  label="Postal Code"
                  variant="standard"
                  type="text"
                  className="col-md-3"
                  name="home_postal_code"
                  value={formContactValues.home_postal_code}
                  onChange={handleContactInputChange}
                />
                <TextField
                  id="txtCountry"
                  label="Country"
                  variant="standard"
                  type="text"
                  className="col-md-9"
                  name="home_country"
                  value={formContactValues.home_country}
                  onChange={handleContactInputChange}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CustomCardHeader title="General Information"></CustomCardHeader>
            <CardContent>
              <Row className="col-md-12">
                <Col className="col-md-3">
                  <FormControl sx={{ width: "100%" }} error={hasError}>
                    <Stack>
                      <FormLabel sx={formLabelStyling}>Birth Sex</FormLabel>
                    </Stack>
                    <Stack>
                      <Select
                        id="selBirthSex"
                        name="birth_sex"
                        value={formValues.birth_sex}
                        label="Birth Sex"
                        onChange={handleInputChange}
                        size="small"
                      >
                        <MenuItem value={"M"}>Male</MenuItem>
                        <MenuItem value={"F"}>Female</MenuItem>
                        <MenuItem value={"O"}>Other</MenuItem>
                      </Select>
                    </Stack>
                  </FormControl>
                </Col>
                <Col className="col-md-4">
                  <Stack>
                    <FormLabel sx={formLabelStyling}>Date of birth:</FormLabel>
                  </Stack>
                  <Stack>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label=""
                        inputFormat="dd/MM/yyyy"
                        value={dateOfBirth}
                        onChange={handleDOBChange}
                        maxDate={new Date()}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Stack>
                </Col>
                <Col className="col-md-2">
                  <Stack>
                    <FormLabel sx={formLabelStyling}>Age:</FormLabel>
                  </Stack>
                  <Stack>
                    <Input
                      id="txt_age"
                      size="small"
                      type="text"
                      value={age}
                      disabled
                    />
                  </Stack>
                </Col>
                <Col className="col-md-3">
                  <Stack>
                    <FormControlLabel
                      sx={{ paddingTop: "25px" }}
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          onChange={handleDeceased}
                          style={{
                            paddingLeft: "7px",
                            paddingBottom: "0px",
                          }}
                        />
                      }
                      label="Deceased"
                    />
                    {/* <Checkbox
                      {...label}
                      size="small"
                      id="chk_deceased"
                      onChange={handleDeceased}
                      className="col-md-1"
                      style={{
                        paddingLeft: "7px",
                        paddingBottom: "0px",
                      }}
                    /> */}
                  </Stack>
                </Col>
                {/* <Col className="col-md-2">
                  <Stack>
                    <FormLabel sx={formLabelStyling}>Deceased:</FormLabel>
                  </Stack>
                  <Stack>
                    <Input id="txt_deceased" type="text" disabled={deceased} />
                  </Stack>
                </Col> */}
                {/* <Col className="col-md-4">
                  <Stack>
                    <FormLabel sx={formLabelStyling}>Legal Sex</FormLabel>
                  </Stack>
                  <Stack>
                    <Select
                      id="selLegalSex"
                      value={legalSex}
                      label="Legal Sex"
                      onChange={handleLegalSexChange}
                      size="small"
                    >
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"O"}>Other</MenuItem>
                    </Select>
                  </Stack>
                </Col>
                <Col className="col-md-4">
                  <Stack>
                    <FormLabel sx={formLabelStyling}>Gender Identity</FormLabel>
                  </Stack>
                  <Stack>
                    <Select
                      id="selGenderIdentity"
                      value={genderIdentity}
                      label="Gender Identity"
                      onChange={handleGenderIdentityChange}
                      size="small"
                    >
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                      <MenuItem value={"O"}>Other</MenuItem>
                    </Select>
                  </Stack>
                </Col> */}
              </Row>
              <Row className="col-md-12">
                <Col className="col-md-3">
                  <FormControlLabel
                    sx={{ paddingTop: "25px" }}
                    control={<Checkbox defaultChecked size="small" />}
                    label="High Risk"
                  />
                </Col>
                <Col className="col-md-3">
                  <Stack>
                    <FormLabel sx={formLabelStyling}>
                      Social security no:
                    </FormLabel>
                  </Stack>
                  <Stack>
                    <Input
                      id="txt_ssn"
                      type="text"
                      name="ssn"
                      value={formValues.ssn}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: 9 }}
                    />
                  </Stack>
                </Col>
                <Col className="col-md-4">
                  <FormControl sx={{ width: "100%" }} error={hasError}>
                    <Stack>
                      <FormLabel sx={formLabelStyling}>
                        Marital status:
                      </FormLabel>
                    </Stack>
                    <Stack>
                      <Select
                        labelId="demo-simple-select-label"
                        id="sel_MartialStatus"
                        name="marital_status"
                        value={formValues.marital_status}
                        label="Marital status: "
                        onChange={handleInputChange}
                        size="small"
                      >
                        <MenuItem value={"M"}>Married</MenuItem>
                        <MenuItem value={"U"}>Unmarried</MenuItem>
                        <MenuItem value={"D"}>Divorced</MenuItem>
                        <MenuItem value={"S"}>Separated</MenuItem>
                      </Select>
                    </Stack>
                  </FormControl>
                </Col>
              </Row>
              <Row className="col-md-12">
                <Col className="col-md-4">
                  <FormControl sx={{ width: "100%" }} error={hasError}>
                    <Stack>
                      <FormLabel sx={formLabelStyling}>Race:</FormLabel>
                    </Stack>
                    <Stack>
                      <Select
                        labelId="demo-simple-select-label"
                        id="sel_Race"
                        name="race"
                        value={formValues.race}
                        label="Race: "
                        onChange={handleInputChange}
                        size="small"
                      >
                        <MenuItem value={"I"}>American Indian</MenuItem>
                        <MenuItem value={"A"}>Asian</MenuItem>
                        <MenuItem value={"B"}>Black</MenuItem>
                        <MenuItem value={"P"}>Pacific</MenuItem>
                        <MenuItem value={"O"}>Other</MenuItem>
                      </Select>
                    </Stack>
                  </FormControl>
                </Col>

                <Col className="col-md-4">
                  <FormControl sx={{ width: "100%" }} error={hasError}>
                    <Stack>
                      <FormLabel sx={formLabelStyling}>
                        Employmet status:
                      </FormLabel>
                    </Stack>
                    <Stack>
                      <Select
                        labelId="demo-simple-select-label"
                        id="sel_EmpStatus"
                        name="employment_status"
                        value={formValues.employment_status}
                        label="Employmet status: "
                        onChange={handleInputChange}
                        size="small"
                      >
                        <MenuItem value={"P"}>Part Time</MenuItem>
                        <MenuItem value={"F"}>Full Time</MenuItem>
                        <MenuItem value={"R"}>Retired</MenuItem>
                        <MenuItem value={"S"}>Self Employed</MenuItem>
                      </Select>
                    </Stack>
                  </FormControl>
                </Col>
                <Col className="col-md-4">
                  <FormControl sx={{ width: "100%" }} error={hasError}>
                    <Stack>
                      <FormLabel sx={formLabelStyling}>
                        {" "}
                        Student status:
                      </FormLabel>
                    </Stack>
                    {/* <InputLabel htmlFor="name">Student status:</InputLabel> */}
                    <Stack>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="student_status"
                        value={formValues.student_status}
                        label="Student status: "
                        onChange={handleInputChange}
                        size="small"
                      >
                        <MenuItem value={"F"}>Full Time Student</MenuItem>
                        <MenuItem value={"N"}>Not a student</MenuItem>
                        <MenuItem value={"P"}>Part Time Student</MenuItem>
                      </Select>
                    </Stack>
                    {hasError && <FormHelperText>*Required!</FormHelperText>}
                  </FormControl>
                </Col>
              </Row>
              <Row className="col-md-12"></Row>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CustomCardHeader title="Phone Numbers"></CustomCardHeader>
            <CardContent>
              <Stack>
                <TextField
                  id="standard-basic"
                  label="Home"
                  variant="standard"
                  type="text"
                  name="home_phone"
                  inputProps={{ maxLength: 10 }}
                  value={formContactValues.home_phone}
                  onChange={handleContactInputChange}
                />
              </Stack>
              <Stack>
                <TextField
                  id="standard-basic"
                  label="Work"
                  variant="standard"
                  type="text"
                  name="work_phone"
                  inputProps={{ maxLength: 10 }}
                  value={formContactValues.work_phone}
                  onChange={handleContactInputChange}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={7} sm={1}>
          <Card>
            <CustomCardHeader title="Other Identifiers"></CustomCardHeader>
            <CardContent>
              <Stack>
                <TextField
                  id="standard-basic"
                  label="Enterprise Identifier"
                  variant="standard"
                  type="text"
                />
              </Stack>
              <Stack>
                <TextField
                  id="standard-basic"
                  label="Alternate Identifier:"
                  variant="standard"
                  type="text"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={6}>
          <Card>
            <CustomCardHeader title="Medical Record Numbers"></CustomCardHeader>
            <CardContent>
              <Row className="col-md-12">
                <Col className="col-md-10">
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell component="th">
                            Record Number
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            Facility
                          </StyledTableCell>
                          <StyledTableCell component="th"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formMRN.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell scope="row">
                              <TextField
                                type="text"
                                variant="standard"
                                size="small"
                                id={"txtRowNo_" + index}
                                onChange={(e) => handleFormMRN(e, index)}
                                name="recordNumber"
                                value={row.recordNumber}
                              />
                            </StyledTableCell>
                            <StyledTableCell scope="row">
                              <TextField
                                type="text"
                                variant="standard"
                                size="small"
                                id={"txtFacility_" + index}
                                onChange={(e) => handleFormMRN(e, index)}
                                name="facility"
                                value={row.facility}
                              />
                            </StyledTableCell>
                            <StyledTableCell scope="row">
                              <Tooltip title="Delete Row">
                                <IconButton
                                  id={"btn" + index}
                                  onClick={(e) => removeRow(index)}
                                >
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </Tooltip>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Col>
                <Col className="col-md-2">
                  <Tooltip title="Add Row">
                    <IconButton onClick={addRow}>
                      <PlusOneIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={7} sm={1}>
          <Card>
            <CustomCardHeader title="Register Identifiers"></CustomCardHeader>
            <CardContent>
              <Row className="col-md-12">
                <Col className="col-md-6">
                  <TextField
                    id="standard-basic"
                    label="Individual Health Identifier:"
                    variant="standard"
                    type="text"
                  />
                </Col>
                <Col className="col-md-6">
                  <TextField
                    id="standard-basic"
                    label="Country of birth:"
                    variant="standard"
                    type="text"
                  />
                </Col>
              </Row>
              <Row className="col-md-12">
                <Col className="col-md-6">
                  <TextField
                    id="standard-basic"
                    label="Aboriinality:"
                    variant="standard"
                    type="text"
                  />
                </Col>
                <Col className="col-md-6">
                  <TextField
                    id="standard-basic"
                    label="Preferred language:"
                    variant="standard"
                    type="text"
                  />
                </Col>
              </Row>
              <Stack></Stack>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default PatientDemographicComponent;
