import { ChangeEvent, memo, useCallback, useState } from "react";
import { formatDate } from "../../services/CommonServices";
import {
  deletePatient,
  getDataById,
  postData,
  updateData,
} from "../../services/PatientServices";
import FullPageLoader from "../common/Loader/FullPageLoader";
import AlertPopup from "../common/popup/AlertPopup";
import {
  Body1,
  Caption1,
  Checkbox,
  Input,
  Label,
  Tooltip,
  Button,
} from "@fluentui/react-components";
import {
  Add16Filled,
  ChevronDown12Filled,
  ChevronDown16Filled,
  Delete16Filled,
  Search24Filled,
} from "@fluentui/react-icons";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Select,
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableCell,
  Option,
  DropdownProps,
} from "@fluentui/react-components/unstable";
import {
  patientAddressFields,
  patientContactFields,
  employerFields,
  employerAddressFields,
} from "../../constant/formFields";
import "../../style/CommonStyle.scss";
import InputBox from "../common/ElementsUI/InputBox";
import {
  DatePicker,
  defaultDatePickerStrings,
  IDropdownOption,
  Dropdown,
  Stack,
  Icon,
} from "@fluentui/react";
import ButtonComponent from "../common/ElementsUI/ButtonComponent";
import DropdownComponent from "../common/ElementsUI/DropdownComponent";
import {
  genderOptions,
  maritalStatusOptions,
  raceOptions,
  employmentOptions,
  studentOptions,
} from "../../constant/optionsArray";

const addressFields = patientAddressFields;
const contactFields = patientContactFields;
const empAddressFields = employerAddressFields;
const empFields = employerFields;
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

const defaultEmployerValues = {
  emp_name: "",
  emp_id: "",
  home_street1: "",
  home_street2: "",
  home_city: "",
  home_state: "",
  home_postal_code: "",
  home_country: "",
};

const PatientEmployerComponent = (props: any) => {
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
  const [empFormValues, setEmpFormValues] = useState(defaultEmployerValues);


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
    } else if (id) {
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

  const handleDOBChange = (newValue: any | Date) => {
    console.log("selectedDate", newValue);
    if (newValue) {
      var diff_ms = Date.now() - newValue.getTime();
      var age_dt = new Date(diff_ms);

      setAge(Math.abs(age_dt.getUTCFullYear() - 1970).toString());
    }
    setDateOfBirth(newValue as Date);
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

  const handleEmpInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleStateChange = useCallback(
    (formData: any) => {
      props.onTabChange(formData);
    },
    [formValues]
  );

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
      formValues.first_name = props.formData.FirstName;
      formValues.last_name = props.formData.LastName;
      formValues.middle_name = props.formData.MiddleName;
      formValues.suffix = props.formData.Suffix;
      formValues.date_of_birth = formatDate(dateOfBirth);
      formValues.id = "";
      deceased ? (formValues.deceased = "Y") : (formValues.deceased = "N");
      console.log("form data before save", formValues);

      if (submitButtonName === "Save") {
        await postData(formValues)
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
        await updateData(formValues)
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

  return (
    <div className="p-4 bg-gray-900">
      <div className="containerResponsiveAllignment">
        <Card>
          <CardHeader
            className="cardHeader"
            header={
              <Body1>
                <b>Employer Information</b>
              </Body1>
            }
          />
          <div className="grid grid-cols-2">
            {empFields.map((field: any, i: number) => (
              <div key={i} className="col-span-1">
                <InputBox
                  handleChange={handleEmpInputChange}
                  value={formContactValues[field.name]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
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
                  <b>Address</b>
                </Body1>
              }
            />
            <div className="grid grid-cols-2">
              {empAddressFields.map((field: any, i: number) => (
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

export default memo(PatientEmployerComponent);