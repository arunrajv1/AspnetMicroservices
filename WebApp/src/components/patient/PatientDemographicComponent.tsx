import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { formatDate } from "../../services/CommonServices";
import {
  deletePatient,
  postData,
  updateData,
} from "../../services/PatientServices";
import FullPageLoader from "../common/Loader/FullPageLoader";
import AlertPopup from "../common/popup/AlertPopup";
import { Body1, Tooltip, Button } from "@fluentui/react-components";
import { Add16Filled, Delete16Filled } from "@fluentui/react-icons";
import {
  Card,
  CardHeader,
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableCell,
} from "@fluentui/react-components/unstable";
import {
  patientAddressFields,
  patientContactFields,
} from "../../constant/formFields";
import "../../style/CommonStyle.scss";
import InputBox from "../common/ElementsUI/InputBox";
import { DatePicker, defaultDatePickerStrings, Dropdown, Checkbox, Text, TextField, ITextProps, ActionButton, IIconProps } from "@fluentui/react";
import ButtonComponent from "../common/ElementsUI/ButtonComponent";
import DropdownComponent from "../common/ElementsUI/DropdownComponent";
import {
  genderOptions,
  maritalStatusOptions,
  raceOptions,
  employmentOptions,
  studentOptions,
  defaultCountryOptions,
  defaultStateOptions,
  defaultCityOptions,
} from "../../constant/optionsArray";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../AuthConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ConfirmationPopup from "../common/popup/ConfirmationPopup";
import { lookup } from "zipcodes";
import { useTranslation } from "react-i18next";
// import { PostalCodes } from "postal-codes";
// import { lookupPostcode, Client } from "@ideal-postcodes/core-interface";

// const client = new Client({ api_key: "iddqd" });
// const postcode = "22222";

let country: any = defaultCountryOptions;
let addressFields = patientAddressFields;
const contactFields = patientContactFields;
contactFields.map(
  (x) =>
  (x.countryCode =
    "+" + country.filter((x: any) => x.isoCode == "US")[0].phonecode)
);
var accessToken: string;
const re = /^[0-9\b]+$/;
let states: any = defaultStateOptions;
let cities: any = defaultCityOptions;
const defaultDropdownKeyValue: any = { text: "", key: "" };

states.map((x: any) => {
  x.key = x.isoCode;
  x.text = x.name;
});
cities.map((x: any) => {
  x.key = x.name;
  x.text = x.name;
});
country.map((x: any) => {
  x.key = x.isoCode;
  x.text = x.name;
});

let selectedCountries: any = country;
let selectedCities: any = defaultDropdownKeyValue;
let selectedStates: any = states
  .filter((x: any) => x.countryCode == "US")
  .sort((a: any, b: any) => (a.text > b.text ? 1 : -1));
// let tempState: any = selectedStates[0];
const onFormatDate = (date?: Date): string => {
  return !date
    ? ""
    : (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
};

const genderArray = genderOptions;
const maritalArray = maritalStatusOptions;
const raceArray = raceOptions;
const employmentArray = employmentOptions;
const studentArray = studentOptions;

const addFriendIcon: IIconProps = { iconName: 'AddFriend' };

export interface IMedicalRecordNumber {
  recordNumber: string;
  facility: string;
}

const defaultValues: any = {
  home_street1: "",
  home_street2: "",
  home_city: "",
  home_state: "",
  home_postal_code: "",
  home_country: selectedCountries.filter((x: any) => x.isoCode === "US")[0]
    .name,
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
  id: 0,
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
  const [formMRN, setFormMRN] = useState(defaultMRN);
  const [alertState, setAlertState] = useState(false);
  const [alertProps, updateAlertProps] = useState(defaultAlertProps);
  const [isCityDisable, setCityDisable] = useState(true);
  const [isStateDisable, setStateDisable] = useState(false);
  const [isSaveDisable, setIsSaveDisable] = useState(false);
  const [isAllDisable, setIsAllDisable] = useState(false);
  const [disableEditButton, setDisableEditButton] = useState(true);
  const [submitButtonName, setSubmitButtonName] = useState("Save");
  const [loading, setLoading] = useState(false);
  const [alertBoxText, setAlertBoxText] = useState("");
  const { instance, accounts, inProgress } = useMsal();
  const [confirmationState, setConfirmationState] = useState(false);
  const [selectedCountryKey, setSelectedCountryKey] = useState(["US"]);
  const [selectedStateKey, setSelectedStateKey] = useState([""]);
  const [selectedCityKey, setSelectedCityKey] = useState([""]);
  // const [rowAction, setRowAction] = useState<IMedicalRecordNumber[]>([
  //   { recordNumber: "", facility: "" },
  // ]);

  const patientDemographics = useSelector(
    (state: RootState) => state.patientDetails.data
  );
  const spinnerSelector = useSelector(
    (state: RootState) => state.commonUIElements.data
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const columns = [
    {
      columnKey: "recNo",
      label: `${t("demographic.mrn.rec_no")}`,
    },
    {
      columnKey: "facility",
      label: t("demographic.mrn.facility"),
    },
  ];
  // console.log('zip code', lookup("22222"), lookup("700079"));
  // //console.log('pincode', client);
  // lookupPostcode({ client, postcode }).then(addresses => {
  //   console.log('postcode address', addresses);
  // });

  useEffect(() => {
    // console.log('redux patient details useEffect', patientDemographics, spinnerSelector);
    if (patientDemographics.first_name) {
      setIsSaveDisable(true);
      bindPatientDetails(patientDemographics);
      setDisableEditButton(false);
      setIsAllDisable(true);
    }
  }, [patientDemographics, spinnerSelector]);

  const resetForm = () => {
    setDateOfBirth(new Date());
    setHasError(false);
    setFormValues(defaultValues);
    setAlertState(false);
    updateAlertProps(defaultAlertProps);
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
      first_name: "",
      last_name: "",
      middle_name: "",
      suffix: "",
      isDisabled: false,
    };
    props.onSavePatientData(patientNameData);
    props.onChangeDisable(false);
    props.onTabChange(defaultValues);

    selectedCountries = country;
    selectedStates = states;
    selectedCities = cities;

    setSelectedCountryKey(["US"]);
    setSelectedStateKey([""]);
    setSelectedCityKey([""]);

    setCityDisable(true);
    setStateDisable(true);
  };

  const handleInputChange = (e: any, option?: any) => {
    let { name, value, id } = e.target;
    let obj: any;
    if (name === "home_postal_code") {
      let returnData = hadlePostalCode(e);
      // value = returnData.toString();
      setFormValues(returnData);
      return;
    }
    if (name === "home_phone") {
      let returnData = handleHomePhoneChange(e);
      setFormValues(returnData);
      return;
    }
    if (name === "work_phone") {
      let returnData = handleWorkPhoneChange(e);
      setFormValues(returnData);
      return;
    }
    if (name) {
      obj = { ...formValues, [name]: value };
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else if (id) {
      obj = { ...formValues, [id]: option.key };
      if (id === "home_country") {
        selectedStates = states
          .filter((x: any) => x.countryCode == option.key)
          .sort((a: any, b: any) => (a.text > b.text ? 1 : -1));
        if (selectedStates.length > 0) {
          contactFields.map(
            (x) =>
            (x.countryCode =
              "+" +
              country.filter((x: any) => x.isoCode == option.key)[0]
                .phonecode)
          );
          selectedCities = defaultDropdownKeyValue;
          setStateDisable(false);
          setCityDisable(true);
        } else setStateDisable(true);
        option.key = option.name;
      } else if (id === "home_state") {
        selectedCities = cities
          .filter(
            (x: any) =>
              x.stateCode == option.key && x.countryCode == option.countryCode
          )
          .sort((a: any, b: any) => (a.text > b.text ? 1 : -1));
        if (selectedCities.length > 0) setCityDisable(false);
        else setCityDisable(true);
        option.key = option.name;
      }
      setFormValues({
        ...formValues,
        [id]: option.key,
      });
    }
    handleStateChange(obj);
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

  const handleDeceased = (
    event?: FormEvent<HTMLElement | HTMLInputElement>,
    isChecked?: boolean
  ) => {
    if (isChecked) setDeceased("Y");
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
      updatedRows.splice(index, 1);
      setFormMRN(updatedRows);
    }
    if (formMRN.length == 1) {
      setFormMRN([
        {
          index: 0,
          med_rec_no: "",
          medical_facility: "",
        },
      ]);
    }
  };

  const handleHomePhoneChange = (e: any): any => {
    let obj: any;
    if (e.target.value === "" || re.test(e.target.value)) {
      obj = {
        ...formValues,
        ["home_phone"]: e.target.value,
      };
      contactFields
        .filter((x) => x.name === e.target.name)
        .map((x) => (x.errorMessage = "Invalid home phone"));
    } else {
      obj = {
        ...formValues,
        ["home_phone"]: "",
      };
      contactFields
        .filter((x) => x.name === e.target.name)
        .map((x) => (x.errorMessage = "Only numbers are accepted"));
    }
    handleStateChange(obj);
    return obj;
  };
  const handleWorkPhoneChange = (e: any): any => {
    let obj: any;
    if (e.target.value === "" || re.test(e.target.value)) {
      obj = {
        ...formValues,
        ["work_phone"]: e.target.value,
      };
      contactFields
        .filter((x) => x.name === e.target.name)
        .map((x) => (x.errorMessage = "Invalid home phone"));
    } else {
      obj = {
        ...formValues,
        ["work_phone"]: "",
      };
      contactFields
        .filter((x) => x.name === e.target.name)
        .map((x) => (x.errorMessage = "Only numbers are accepted"));
    }
    handleStateChange(obj);
    return obj;
  };
  const hadlePostalCode = (e: any): any => {
    const zipLookUpValue = lookup(e.target.value);
    let obj: any;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (zipLookUpValue === undefined) {
        selectedCountries = country;
        selectedStates = states;
        selectedCities = cities;

        setSelectedCountryKey([""]);
        setSelectedStateKey([""]);
        setSelectedCityKey([""]);

        setCityDisable(true);
        setStateDisable(true);

        obj = {
          ...formValues,
          ["home_postal_code"]: e.target.value,
          ["home_state"]: "",
          ["home_city"]: "",
        };
        addressFields
          .filter((x) => x.name == e.target.name)
          .map((x) => (x.errorMessage = "Invalid postal code"));
      } else {
        selectedCountries = country.filter(
          (x: any) => x.isoCode === zipLookUpValue.country
        );
        selectedStates = states
          .filter(
            (x: any) =>
              x.isoCode === zipLookUpValue.state &&
              x.countryCode === zipLookUpValue.country
          )
          .sort((a: any, b: any) => (a.text > b.text ? 1 : -1));
        selectedCities = cities
          .filter(
            (x: any) =>
              x.text == zipLookUpValue.city &&
              x.stateCode == zipLookUpValue.state
          )
          .sort((a: any, b: any) => (a.text > b.text ? 1 : -1));

        setSelectedCountryKey([zipLookUpValue.country]);
        setSelectedStateKey([zipLookUpValue.state]);
        setSelectedCityKey([zipLookUpValue.city]);

        setStateDisable(false);
        setCityDisable(false);

        obj = {
          ...formValues,
          ["home_postal_code"]: e.target.value,
          ["home_state"]: selectedStates[0].name,
          ["home_city"]: selectedCities[0].key,
        };
        addressFields
          .filter((x) => x.name == e.target.name)
          .map((x) => (x.errorMessage = ""));
        //console.log('all states', selectedStates, selectedCities, zipLookUpValue);
      }
      handleStateChange(obj);
      // return obj;
    } else if (e.target.value.length == 1) {
      obj = {
        ...formValues,
        ["home_postal_code"]: "",
        ["home_state"]: "",
        ["home_city"]: "",
      };
      addressFields
        .filter((x) => x.name == e.target.name)
        .map((x) => (x.errorMessage = "Only numbers are allowed"));
      // return obj;
    } else {
      obj = {
        ...formValues,
        ["home_postal_code"]: e.target.value.slice(
          0,
          e.target.value.length - 1
        ),
        ["home_state"]: "",
        ["home_city"]: "",
      };
      // return obj;
    }
    return obj;
  };

  const bindPatientDetails = (formData: any) => {
    setFormValues({
      ...formValues,
      mrn: [],
      birth_sex: formData.birth_sex,
      date_of_birth: new Date(formData.date_of_birth).toDateString(),
      ssn: formData.ssn,
      race: formData.race,
      marital_status: formData.marital_status
        ? formData.marital_status.toUpperCase()
        : "",
      employment_status: formData.employment_status,
      student_status: formData.student_status,
      deceased: formData.deceased,
      home_city: formData.home_city,
      home_country: formData.home_country,
      home_phone: formData.home_phone,
      home_postal_code: formData.home_postal_code,
      home_state: formData.home_state,
      home_street1: formData.home_street1,
      home_street2: formData.home_street2,
      // id: 0,
    });
    setDeceased(formData.deceased);

    if (formData.mrn) setFormMRN(formData.mrn);

    handleDOBChange(new Date(formData.date_of_birth));
    const patientNameData: any = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      middle_name: formData.middle_name,
      suffix: formData.suffix,
    };
    // props.onSavePatientData(patientNameData);
    // props.onChangeDisable(true);
    // setIsAllDisable(true);
    // console.log("incoming data", formData);
  };

  const getPatientDetailsById = useCallback(() => {
    console.log("redux patient details callback", patientDemographics);
  }, [patientDemographics]);

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

  async function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    await instance
      .acquireTokenSilent(request)
      .then((response) => {
        accessToken = response.accessToken;
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          accessToken = response.accessToken;
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
      formValues.home_street1.length === 0 ||
      //(formValues.home_street2 && formValues.home_street2.length === 0 ) ||
      formValues.home_city.length === 0 ||
      formValues.home_state.length === 0 ||
      formValues.home_postal_code.length === 0 ||
      formValues.home_country.length === 0 ||
      props.formData.first_name === undefined ||
      props.formData.first_name.length === 0 ||
      props.formData.last_name === undefined ||
      props.formData.last_name.length === 0 // ||
      // props.formData.suffix === undefined ||
      // props.formData.suffix.length === 0
    ) {
      setHasError(true);
      addressFields
        .filter((y) => formValues[`${y.name}`] === "")
        .map((y) => (y.errorMessage = "Required field"));
      contactFields
        .filter((y) => formValues[`${y.name}`] === "")
        .map((y) => (y.errorMessage = "Required field"));
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
      //formValues.address = formContactValues;
      formValues.first_name = props.formData.first_name;
      formValues.last_name = props.formData.last_name;
      formValues.middle_name = props.formData.middle_name;
      formValues.suffix = props.formData.suffix;
      formValues.date_of_birth = formatDate(dateOfBirth);
      formValues.id = 0;
      deceased ? (formValues.deceased = "Y") : (formValues.deceased = "N");
      console.log("form data before save", formValues);

      if (submitButtonName === "Save") {
        accessToken = await RequestAccessToken();
        await postData(formValues, accessToken)
          .then((response) => {
            if (response.status === 200 || response.status === 204) {
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
        formValues.id = patientDemographics.id;
        accessToken = await RequestAccessToken();
        await updateData(formValues, accessToken)
          .then((response) => {
            //if (response.status === 200 && response.statusText === "OK") {
            if (response.status === 200 || response.status === 204) {
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
    setConfirmationState(true);

    accessToken = await RequestAccessToken();
    await deletePatient(patientDemographics.id, accessToken).then(
      (response) => {
        // if (response.status === 200 && response.statusText === "OK") {
        if (response.status === 200 || response.status === 204) {
          setAlertState(true);
          setAlertBoxText("Record Deleted Successfully");
          setDisableEditButton(false);
          setIsSaveDisable(true);
          resetForm();
        } else {
          setAlertState(true);
          setAlertBoxText("Delete operation failed");
        }
      }
    );
  };

  return (
    <div className="p-4 bg-zinc-300">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:grid-rows-1 sm:grid-rows-2 justify-between -space-y-px">
        <div className="grid grid-cols-3 gap-2 justify-between">
          <div className="col-span-1 flex justify-end">
            <ButtonComponent
              handleClick={editPatientDetails}
              type="Button"
              text="Edit"
              isDisabled={disableEditButton}
            />
            <ActionButton iconProps={addFriendIcon} allowDisabledFocus disabled={false} checked={false} onClick={resetForm}>
              New Patient
            </ActionButton>
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
                <Text key={1} style={{ color: "white" }} variant={'large'} nowrap block>
                  {t("demographic.address.name")}
                </Text>
              </Body1>
            }
          />
          <div className="grid grid-cols-2">
            {addressFields.map((field: any, i: number) => (
              <div key={i} className="col-span-1">
                <InputBox
                  handleChange={handleInputChange}
                  value={formValues[field.name]}
                  labelText={t(`demographic.address.${field.labelText}`)}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  maxLength={field.maxLength}
                  minLength={field.minLength}
                  isRequired={field.isRequired}
                  placeholder={t(`demographic.address.${field.placeholder}`)}
                  errorMessage={field.errorMessage}
                  isDisabled={isAllDisable}
                />
              </div>
            ))}
            <div className="col-span-1 px-4">
              <Dropdown
                key={selectedCountries.key}
                id="home_country"
                placeholder="Select Country"
                selectedKey={selectedCountries.key}
                defaultSelectedKey={selectedCountryKey}
                disabled={isAllDisable}
                required={true}
                // label="Country"
                options={selectedCountries}
                onChange={handleInputChange}
                label={t("demographic.address.country")}
              ></Dropdown>
            </div>
            <div className="justify-start col-span-1 px-4">
              <Dropdown
                key={selectedStates.key}
                id="home_state"
                placeholder={t("demographic.address.state_placeholder")}
                selectedKey={selectedStates.key}
                defaultSelectedKey={selectedStateKey}
                disabled={isStateDisable || isAllDisable}
                required={true}
                // label="State"
                options={selectedStates}
                onChange={handleInputChange}
                label={t("demographic.address.state")}
                errorMessage={t("demographic.address.state_error_message")}
              ></Dropdown>
            </div>
            <div className="col-span-1 px-4">
              <Dropdown
                id="home_city"
                placeholder={t("demographic.address.city_placeholder")}
                selectedKey={selectedCities.key}
                defaultSelectedKey={selectedCityKey}
                disabled={isCityDisable || isAllDisable}
                required={false}
                // label="City"
                options={selectedCities}
                onChange={handleInputChange}
                label={t("demographic.address.city")}
              ></Dropdown>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1">
          <Card>
            <CardHeader
              className="cardHeader"
              header={
                <Body1>
                  <Text key={1} style={{ color: "white" }} variant={'large'} nowrap block>
                    {t("demographic.general_information.name")}
                  </Text>
                </Body1>
              }
            />
            <div className="grid grid-rows-3 grid-flow-col">
              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3 px-4">
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.birth_sex}
                    optionsArray={genderArray}
                    labelText={t("demographic.general_information.birth_sex")}
                    id="birth_sex"
                    isRequired={true}
                    placeholder={t(
                      "demographic.general_information.birth_sex_placeholder"
                    )}
                    isDisabled={isAllDisable}
                  />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DatePicker
                    id="calenderDOB"
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
                    label={t("demographic.general_information.dob")}
                  />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <div className="grid grid-cols-1">
                    <TextField
                      className="flex"
                      id="txt_age"
                      value={age}
                      type="text"
                      disabled
                      label={t("demographic.general_information.age")}
                      minLength={1}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3 px-4 -space-y-px ">
                <div className="sm:col-span-1 justify-start">
                  <TextField
                    className="flex"
                    id="txt_ssn"
                    name="ssn"
                    value={formValues.ssn}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isAllDisable}
                    minLength={5}
                    maxLength={9}
                    required={true}
                    //errorMessage="Required field"
                    label={t("demographic.general_information.ssn")}
                  />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.marital_status}
                    optionsArray={maritalArray}
                    labelText={t(
                      "demographic.general_information.marital_status"
                    )}
                    id="marital_status"
                    isRequired={true}
                    placeholder={t(
                      "demographic.general_information.marital_status_placeholder"
                    )}
                    isDisabled={isAllDisable}
                  />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.race}
                    optionsArray={raceArray}
                    labelText={t("demographic.general_information.race")}
                    id="race"
                    isRequired={true}
                    placeholder={t(
                      "demographic.general_information.race_placeholder"
                    )}
                    isDisabled={isAllDisable}
                  />
                </div>
              </div>
              {/*Row 3*/}
              <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3 px-4 -space-y-px">
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.employment_status}
                    optionsArray={employmentArray}
                    labelText={t(
                      "demographic.general_information.employment_status"
                    )}
                    id="employment_status"
                    isRequired={true}
                    placeholder={t(
                      "demographic.general_information.employment_status_placeholder"
                    )}
                    isDisabled={isAllDisable}
                  />
                </div>
                <div className="sm:col-span-1 justify-start">
                  <DropdownComponent
                    handleChange={handleInputChange}
                    value={formValues.student_status}
                    optionsArray={studentArray}
                    labelText={t(
                      "demographic.general_information.student_status"
                    )}
                    id="student_status"
                    isRequired={true}
                    placeholder={t(
                      "demographic.general_information.student_status_placeholder"
                    )}
                    isDisabled={isAllDisable}
                  />
                </div>

                <div className="sm:col-span-1 p-4">
                  <Checkbox
                    id="chkDeceased"
                    disabled={isAllDisable}
                    label={t("demographic.general_information.deceased")}
                    //value={deceased}
                    onChange={handleDeceased}
                  />
                </div>
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
                  <Text key={1} style={{ color: "white" }} variant={'large'} nowrap block>
                    {t("demographic.phone_number.name")}
                  </Text>
                </Body1>
              }
            />
            <div className="grid lg:grid-rows-1 sm:grid-rows-2 grid-flow-col">
              {contactFields.map((field: any, i: number) => (
                <InputBox
                  key={i}
                  handleChange={handleInputChange}
                  value={formValues[field.name]}
                  labelText={t(`demographic.phone_number.${field.labelText}`)}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  maxLength={field.maxLength}
                  isRequired={field.isRequired}
                  placeholder={t(
                    `demographic.phone_number.${field.placeholder}`
                  )}
                  isDisabled={isAllDisable}
                  contentBefore={field.countryCode}
                  errorMessage={field.errorMessage}
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
                  <Text key={1} style={{ color: "white" }} variant={'large'} nowrap block>
                    {t("demographic.mrn.name")}
                  </Text>
                </Body1>
              }
            />
            <div className="grid grid-cols-12">
              <div className="col-span-10 tableStyle">
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
                    {/* <div style={{ maxHeight: "90px", overflowY: "scroll" }}> */}
                    {formMRN.map((row, index) => (
                      <TableRow key={index} className="flex grid-cols-12 pb-2">
                        <TableCell className="grid col-span-5">
                          <InputBox
                            handleChange={(e: any) => handleFormMRN(e, index)}
                            id={"txtRowNo_" + index}
                            name="med_rec_no"
                            size="small"
                            maxLength={20}
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
                            maxLength={20}
                            isDisabled={isAllDisable}
                            value={row.medical_facility}
                          />
                        </TableCell>
                        <TableCell
                          className="grid col-span-1"
                          style={{ maxWidth: "50px" }}
                        >
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
                    {/* </div> */}
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
      {loading || spinnerSelector ? (
        <div style={{ textAlign: "center", width: "100%" }}>
          <FullPageLoader></FullPageLoader>
        </div>
      ) : (
        <></>
      )}
      {alertState ? (
        <AlertPopup
          onClose={() => setAlertState(false)}
          text={alertBoxText}
        ></AlertPopup>
      ) : (
        <></>
      )}
      {confirmationState ? (
        <ConfirmationPopup
          text={"Do You want to delete this record?"}
        ></ConfirmationPopup>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PatientDemographicComponent;
