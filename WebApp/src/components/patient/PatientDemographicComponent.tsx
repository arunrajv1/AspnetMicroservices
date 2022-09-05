import { ChangeEvent, memo, useCallback, useState } from "react";
import { formatDate } from "../../services/CommonServices";
import { deletePatient, getDataById, postData, updateData, } from "../../services/PatientServices";
import SearchIcon from "@mui/icons-material/Search";
import FullPageLoader from "../common/Loader/FullPageLoader";
import AlertPopup from "../common/popup/AlertPopup";
import { Body1, Caption1, Checkbox, Input, Label, Tooltip, Button } from "@fluentui/react-components";
import { Add16Filled, ChevronDown12Filled, ChevronDown16Filled, Delete16Filled, Search24Filled, } from "@fluentui/react-icons";
import { Card, CardFooter, CardHeader, CardPreview, Select, Table, TableRow, TableBody, TableHeader, TableHeaderCell, TableCell, Option, DropdownProps } from "@fluentui/react-components/unstable";
import { patientAddressFields, patientContactFields, } from "../../constant/formFields";
import "../../style/CommonStyle.scss";
import InputBox from "../common/ElementsUI/InputBox";
import { DatePicker, defaultDatePickerStrings, IDropdownOption, Dropdown, Stack, Icon } from "@fluentui/react";
import ButtonComponent from "../common/ElementsUI/ButtonComponent";
import DropdownComponent from "../common/ElementsUI/DropdownComponent";
import { genderOptions, maritalStatusOptions, raceOptions, employmentOptions, studentOptions } from "../../constant/optionsArray";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../AuthConfig";
import { resolveNs } from "dns";



const addressFields = patientAddressFields;
const contactFields = patientContactFields;
var accessToken:string;
const re = /^[0-9-+\b]+$/;
const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};
const columns = [
  {
    columnKey: "recNo",
    label: "Record Number",
  },
  {
    columnKey: "facility",
    label: "Facility",
  },
];

const genderArray = genderOptions;
const maritalArray = maritalStatusOptions;
const raceArray = raceOptions;
const employmentArray = employmentOptions;
const studentArray = studentOptions;

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

const defaultValues = {
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

const defaultContactValues: any = {
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
    index: 0,
    med_rec_no: "",
    medical_facility: "",
  },
];

const defaultAlertProps: any = Object.freeze({
  alertContent: "",
  alertType: "",
  alertTitle: "",
  isAlertOpen: false,
});

let tableRowIndex: number = 0;

const PatientDemographicComponent = (props: any) => {
  const [deceased, setDeceased] = useState("N");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [age, setAge] = useState("");
  const [hasError, setHasError] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const [formContactValues, setFormContactValues] =
    useState(defaultContactValues);
  const [formMRN, setFormMRN] = useState(defaultMRN);
  const [alertState, setAlertState] = useState(false);
  const [alertProps, updateAlertProps] = useState(defaultAlertProps);
  const [searchId, setSearchId] = useState("");
  const [isSaveDisable, setIsSaveDisable] = useState(false);
  const [isAllDisable, setIsAllDisable] = useState(false);
  const [disableEditButton, setDisableEditButton] = useState(true);
  const [submitButtonName, setSubmitButtonName] = useState("Save");
  const [loading, setLoading] = useState(false);
  const [alertBoxText, setAlertBoxText] = useState("");
  const { instance,accounts, inProgress } = useMsal();
  // const [rowAction, setRowAction] = useState<IMedicalRecordNumber[]>([
  //   { recordNumber: "", facility: "" },
  // ]);

  const resetForm = () => {
    setDateOfBirth(new Date());
    setHasError(false);
    setFormValues(defaultValues);
    setFormContactValues(defaultContactValues);
    setAlertState(false);
    updateAlertProps(defaultAlertProps);
    setSearchId("");
    setIsAllDisable(false);
    setIsSaveDisable(false);
    setDisableEditButton(true);
    setSubmitButtonName("Save");
    let updatedRows = [
      {
        index: 0,
        med_rec_no: "",
        medical_facility: "",
      },
    ];
    setFormMRN(updatedRows);
    const patientNameData: any = {
      FirstName: "",
      LastName: "",
      MiddleName: "",
      Suffix: "",
      isDisabled: false,
    };
    props.onSavePatientData(patientNameData);
    props.onChangeDisable(false);
    props.onTabChange(defaultValues);
  };

  const handleInputChange = (e: any, option?: any) => {
    const { name, value, id } = e.target;
    let obj: any;
    if (name) {
      obj = { ...formValues, [name]: value };
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
    else if (id) {
      obj = { ...formValues, [id]: option.key };
      setFormValues({
        ...formValues,
        [id]: option.key,
      });
    }
    handleStateChange(obj);
  };

  const handleContactInputChange = (e: any) => {
    let { name, value } = e.target;
    if (e.target.name === "home_phone") {
      let returnData = handleHomePhoneNumber(e);
      value = returnData.toString();
    } else if (e.target.name === "work_phone") {
      let returnData = handleWorkPhoneNumber(e);
      value = returnData.toString();
    }
    let obj = { ...formContactValues, [name]: value };
    let mainArr = { ...formValues, address: obj };

    setFormContactValues({
      ...formContactValues,
      [name]: value,
    });

    setFormValues({
      ...formValues,
      address: obj,
    });

    handleStateChange(mainArr);
  };

  const handleFormMRN = (e: any, index: number) => {
    const { name, value } = e.target;
    let updatedRows = [...formMRN];

    if (name === "medical_facility") {
      updatedRows[index].medical_facility = value;
      //updatedRows.filter((x) => x.index === index)[0].medical_facility = value;
    } else if (name === "med_rec_no") {
      updatedRows[index].med_rec_no = value;
      //updatedRows.filter((x) => x.index === index)[0].med_rec_no = value;
    }

    setFormMRN(updatedRows);
  };

  const handleDeceased = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setDeceased("Y");
    else setDeceased("N");
  };
  const handleDOBChange = (newValue: any | Date) => {
    console.log("selectedDate", newValue);
    if (newValue) {
      var diff_ms = Date.now() - newValue.getTime();
      var age_dt = new Date(diff_ms);

      setAge(Math.abs(age_dt.getUTCFullYear() - 1970).toString());
    }
    setDateOfBirth(newValue as Date);
  };

  const addRow = () => {
    tableRowIndex = tableRowIndex + 1;
    let updatedRows = [...formMRN];
    updatedRows[tableRowIndex] = {
      index: tableRowIndex,
      med_rec_no: "",
      medical_facility: "",
    };
    setFormMRN(updatedRows);
  };

  const removeRow = (index: number) => {
    if (formMRN.length > 1) {
      let updatedRows = [...formMRN];
      let indexToRemove = updatedRows.findIndex((x) => x.index == index);
      if (indexToRemove > -1) {
        updatedRows.splice(indexToRemove, 1);
        setFormMRN(updatedRows);
      }
    }
  };

  const handleHomePhoneNumber = (e: any) => {
    if (e.target.value === "" || re.test(e.target.value)) {
      return e.target.value;
    } else if (e.target.value.length == 1) {
      return "";
    } else {
      return e.target.value.slice(0, e.target.value.length - 1);
    }
  };

  const handleWorkPhoneNumber = (e: any) => {
    if (e.target.value === "" || re.test(e.target.value)) {
      return e.target.value;
    } else if (e.target.value.length == 1) {
      return "";
    } else {
      return e.target.value.slice(0, e.target.value.length - 1);
    }
  };

  const bindPatientDetails = (formData: any) => {
    setFormValues({
      ...formValues,
      mrn: [],
      birth_sex: formData.birth_sex,
      date_of_birth: new Date(formData.date_of_birth).toDateString(),
      ssn: formData.ssn,
      race: formData.race,
      marital_status: formData.marital_status.toUpperCase(),
      employment_status: formData.employment_status,
      student_status: formData.student_status,
      deceased: formData.deceased,
      id: formData.id,
    });
    setDeceased(formData.deceased);
    setFormContactValues({
      ...formData.address,
    });

    setFormMRN(formData.mrn);

    handleDOBChange(new Date(formData.date_of_birth));
    const patientNameData: any = {
      FirstName: formData.first_name,
      LastName: formData.last_name,
      MiddleName: formData.middle_name,
      Suffix: formData.suffix,
    };
    props.onSavePatientData(patientNameData);
    props.onChangeDisable(true);
    setIsAllDisable(true);
    console.log("incoming data", formData);
  };

  const handleId = (event: any) => {
    setSearchId(event.target.value);
  };



  const getPatientDetailsById = async () => {
    if (!searchId) {
      setAlertState(true);
      setAlertBoxText("Enter Patient Id");
      //return;
    } else {
      setLoading(true);
      accessToken= await RequestAccessToken();
      await getDataById(searchId,accessToken).then((response) => {
        if (
          response.status == 200 &&
          response.statusText == "OK" &&
          response.data.length > 0
        ) {
          setLoading(false);
          setAlertState(true);
          setAlertBoxText("Patient Found");
          setDisableEditButton(false);
          setIsSaveDisable(true);
          bindPatientDetails(response.data[0]);
        } else {
          setLoading(false);
          setAlertState(true);
          setAlertBoxText("Patient Not Found");
        }
      });
    }
  };

  const handleStateChange = useCallback(
    (formData: any) => {
      props.onTabChange(formData);
    },
    [formValues]
  );

  const editPatientDetails = () => {
    props.onChangeDisable(false);
    setIsAllDisable(false);
    setIsSaveDisable(false);
    setSubmitButtonName("Update");
  };

  async function RequestAccessToken()  {
    const request = {
        ...loginRequest,
        account: accounts[0]
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    await instance.acquireTokenSilent(request).then((response) => {
      accessToken =response.accessToken;
    }).catch((e) => {
         instance.acquireTokenPopup(request).then((response) => {
          accessToken=response.accessToken;
        });
    });
    return accessToken;
  }

  const saveUpdatePatientData = async () => {
    if (
      formValues.student_status.length === 0 ||
      formValues.employment_status.length === 0 ||
      formValues.marital_status.length === 0 ||
      formValues.birth_sex.length === 0 ||
      formValues.race.length === 0 ||
      formContactValues.home_street1.length === 0 ||
      formContactValues.home_street2.length === 0 ||
      formContactValues.home_city.length === 0 ||
      formContactValues.home_state.length === 0 ||
      formContactValues.home_postal_code.length === 0 ||
      formContactValues.home_country.length === 0 ||
      props.formData.FirstName === undefined ||
      props.formData.FirstName.length === 0 ||
      props.formData.LastName === undefined ||
      props.formData.LastName.length === 0 ||
      props.formData.Suffix === undefined ||
      props.formData.Suffix.length === 0
    ) {
      setHasError(true);
      return;
    } else {
      setHasError(false);
      formValues.mrn = [];
      formMRN.forEach((e) => {
        if (e.med_rec_no.length > 0 && e.medical_facility.length > 0) {
          let obj = {
            med_rec_no: e.med_rec_no,
            medical_facility: e.medical_facility,
          };
          formValues.mrn.push(obj);
        }
      });
      // formValues.address = formContactValues;
      formValues.first_name = props.formData.FirstName;
      formValues.last_name = props.formData.LastName;
      formValues.middle_name = props.formData.MiddleName;
      formValues.suffix = props.formData.Suffix;
      formValues.date_of_birth = formatDate(dateOfBirth);
      formValues.id = "";
      deceased ? (formValues.deceased = "Y") : (formValues.deceased = "N");
      console.log("form data before save", formValues);

      if (submitButtonName === "Save") {
        accessToken=await RequestAccessToken();
        await postData(formValues,accessToken)
          .then((response) => {
            if (response.status === 200 && response.statusText === "OK") {
              setAlertState(true);
              setAlertBoxText("Data Inserted Successfully");
              resetForm();
            } else {
              setAlertState(true);
              setAlertBoxText("Error occured while saving data");
            }
          })
          .catch((error) => {
            alert(error);
          });
      } else if (submitButtonName === "Update") {
        formValues.id = searchId;
        accessToken=await RequestAccessToken();
        await updateData(formValues,accessToken)
          .then((response) => {
            if (response.status === 200 && response.statusText === "OK") {
              setAlertState(true);
              setAlertBoxText("Data Updated Successfully");
              resetForm();
            } else {
              setAlertState(true);
              setAlertBoxText("Error occured while updating record");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  };

  const deletePatientData = async () => {
    accessToken= await RequestAccessToken();
    await deletePatient(searchId,accessToken).then((response) => {
      if (response.status === 200 && response.statusText === "OK") {
        setAlertState(true);
        setAlertBoxText("Record Deleted Successfully");
        setDisableEditButton(false);
        setIsSaveDisable(true);
        resetForm();
      } else {
        setAlertState(true);
        setAlertBoxText("Delete operation failed");
      }
    });
  };

  return (
    <div className="p-4 bg-gray-900">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:grid-rows-1 sm:grid-rows-2 justify-between -space-y-px">
        <div className="grid grid-cols-3 gap-2 justify-between">
          <div className="col-span-2 flex justify-start">
            <Input
              contentBefore={<Search24Filled />}
              contentAfter={
                <ButtonComponent
                  handleClick={getPatientDetailsById}
                  type="Button"
                  text="Search"
                />
              }
              id="txtSearch"
              onChange={handleId}
              value={searchId}
              placeholder="Search..."
            />
          </div>
          <div className="col-span-1 flex justify-end">
            <ButtonComponent
              handleClick={editPatientDetails}
              type="Button"
              text="Edit"
              isDisabled={disableEditButton}
            />
          </div>
        </div>
        <div className="flex gap-4 grid-cols-2 justify-center">
          <div className="">
            <ButtonComponent
              handleClick={saveUpdatePatientData}
              type="Button"
              text={submitButtonName}
              isDisabled={isSaveDisable}
            />
          </div>
          <div className="">
            <ButtonComponent
              handleClick={deletePatientData}
              type="Cancel"
              text="Delete"
              isDisabled={disableEditButton}
            />
          </div>
        </div>
      </div>
      <div className="containerCardResponsiveAllignment">
        <Card>
          <CardHeader
            className="cardHeader"
            header={
              <Body1>
                <b>Address</b>
              </Body1>
            }
          />
          <div className="grid grid-cols-2">
            {addressFields.map((field: any, i: number) => (
              <div key={i} className="col-span-1">
                <InputBox

                  handleChange={handleContactInputChange}
                  value={formContactValues[field.name]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                  isDisabled={isAllDisable}
                />
              </div>
            ))}
          </div>
        </Card>
        <div className="grid grid-cols-1">
          <Card>
            <CardHeader
              className="cardHeader"
              header={
                <Body1>
                  <b>General Information</b>
                </Body1>
              }
            // description={<Caption1>5h ago · About us - Overview</Caption1>}
            />
            <div className="grid grid-rows-3 grid-flow-col">
              {/*Row 1*/}
              <div className="grid lg:grid-cols-8 md:grid-cols-1 sm:grid-cols-1 gap-3 px-4">
                <div className="lg:col-span-2 sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.birth_sex}
                    optionsArray={genderArray}
                    labelText="Birth Sex"
                    id="birth_sex"
                    isRequired={true}
                    placeholder="Select Gender"
                    isDisabled={isAllDisable} />
                </div>
                <div className="lg:col-span-3 sm:col-span-1 justify-start">
                  <label htmlFor="calenderDOB">Date of birth</label>
                  <DatePicker
                    id="calenderDOB"
                    placeholder="Select a date..."
                    maxDate={new Date()}
                    value={dateOfBirth}
                    strings={defaultDatePickerStrings}
                    allowTextInput
                    formatDate={onFormatDate}
                    //formatDate="dd/MM/yyyy"
                    onSelectDate={handleDOBChange}
                    disabled={isAllDisable}
                    isRequired={true}
                    showMonthPickerAsOverlay={true}
                  />
                </div>
                <div className="lg:col-span-1 sm:col-span-1 justify-start">
                  <label htmlFor="txt_age">Age</label>
                  <div className="grid grid-cols-1">
                    <Input
                      className="flex"
                      id="txt_age"
                      value={age}
                      type="text"
                      disabled
                      //className="inputBox"
                      minLength={1}
                      maxLength={3}
                    />
                  </div>
                </div>
                <div className="lg:col-span-2 sm:col-span-1 justify-start pt-4">
                  <Checkbox
                    id="chkDeceased"
                    disabled={isAllDisable}
                    label="Deceased"
                    value={deceased}
                    onChange={handleDeceased}
                  />
                </div>
              </div>
              {/*Row 2*/}
              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3 px-4 -space-y-px ">
                <div className="sm:col-span-1 justify-start">
                  <label htmlFor="txt_ssn">Social security no:</label>
                  <Input
                    className="flex"
                    id="txt_ssn"
                    name="ssn"
                    value={formValues.ssn}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isAllDisable}
                    minLength={5}
                    maxLength={9}
                  />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.marital_status}
                    optionsArray={maritalArray}
                    labelText="Marital Status"
                    id="marital_status"
                    isRequired={true}
                    placeholder="Select Marital Status"
                    isDisabled={isAllDisable} />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.race}
                    optionsArray={raceArray}
                    labelText="Race"
                    id="race"
                    isRequired={true}
                    placeholder="Select Race"
                    isDisabled={isAllDisable} />
                </div>
              </div>
              {/*Row 3*/}
              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3 px-4 -space-y-px">
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.employment_status}
                    optionsArray={employmentArray}
                    labelText="Employment Status"
                    id="employment_status"
                    isRequired={true}
                    placeholder="Select Employment"
                    isDisabled={isAllDisable} />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.student_status}
                    optionsArray={studentArray}
                    labelText="Student Status"
                    id="student_status"
                    isRequired={true}
                    placeholder="Select Student"
                    isDisabled={isAllDisable} />
                </div>
                <div className="sm:col-span-1 justify-start"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="containerCardResponsiveAllignment">
        <div className="grid col-span-1 my-auto">
          <Card>
            <CardHeader
              className="cardHeader"
              header={
                <Body1>
                  <b>Phone Numbers</b>
                </Body1>
              }
            />
            <div>
              {contactFields.map((field: any, i: number) => (
                <InputBox
                  key={i}
                  handleChange={handleContactInputChange}
                  value={formContactValues[field.name]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                  isDisabled={isAllDisable}
                />
              ))}
            </div>
          </Card>
        </div>
        <div className="grid col-span-1">
          <Card>
            <CardHeader
              className="cardHeader"
              header={
                <Body1>
                  <b>Medical Record Numbers</b>
                </Body1>
              }
            // description={<Caption1>5h ago · About us - Overview</Caption1>}
            />
            <div className="grid grid-cols-12">
              <div className="col-span-10" style={{ maxHeight: "150px", overflowY: "scroll" }}>
                <Table size="smaller">
                  <TableHeader className="">
                    <TableRow>
                      {columns.map((column) => (
                        <TableHeaderCell key={column.columnKey}>
                          {column.label}
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formMRN.map((row, index) => (
                      <TableRow key={index} className="flex grid-cols-12">
                        <TableCell className="grid col-span-5">
                          <InputBox
                            handleChange={(e: any) => handleFormMRN(e, index)}
                            id={"txtRowNo_" + index}
                            name="med_rec_no"
                            size="small"
                            isDisabled={isAllDisable}
                            value={row.med_rec_no}
                          />
                        </TableCell>
                        <TableCell className="grid col-span-6">
                          <InputBox
                            handleChange={(e: any) => handleFormMRN(e, index)}
                            id={"txtFacility_" + index}
                            name="medical_facility"
                            size="small"
                            isDisabled={isAllDisable}
                            value={row.medical_facility}
                          />
                        </TableCell>
                        <TableCell className="grid col-span-1">
                          <Tooltip content="delete row" relationship="label">
                            <Button
                              id={"btn" + index}
                              onClick={(e) => removeRow(index)}
                              disabled={isAllDisable}
                              icon={<Delete16Filled />}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="col-span-2">
                <Tooltip content="add row" relationship="label">
                  <Button
                    disabled={isAllDisable}
                    onClick={addRow}
                    icon={<Add16Filled />}
                  />
                </Tooltip>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {loading && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <FullPageLoader></FullPageLoader>
        </div>
      )}
      {alertState ? (
        <AlertPopup
          onClose={() => setAlertState(false)}
          text={alertBoxText}
        ></AlertPopup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(PatientDemographicComponent);
